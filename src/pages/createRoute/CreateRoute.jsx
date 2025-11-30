import React, { useState, useEffect, useCallback } from 'react';
import {
    ChevronLeft, MapPin, Clock, Timer, Landmark, Leaf, ShoppingBag, BookOpen, Utensils, Zap, Loader2, Info
} from "lucide-react";
import { Container } from "../../container/container.jsx";

const GEMINI_API_KEY = "";
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
const apiKey = GEMINI_API_KEY;

const getInterestIcon = (interest) => {
    const primaryInterest = Array.isArray(interest) ? interest[0] : interest?.split(',')[0];
    const IconProps = { className: "w-6 h-6 mr-2 text-orange-500 flex-shrink-0" };

    switch (primaryInterest?.toLowerCase().trim()) {
        case "history":
            return <Landmark {...IconProps} />;
        case "museums":
            return <BookOpen {...IconProps} />;
        case "food":
            return <Utensils {...IconProps} />;
        case "nature":
            return <Leaf {...IconProps} />;
        case "shopping":
            return <ShoppingBag {...IconProps} />;
        default:
            return <Zap {...IconProps} />;
    }
};

const generateTextRoute = async ({ location, time, interest }) => {
    // API Kalitini shu yerga kiriting!


    const interestString = Array.isArray(interest) ? interest.join(", ") : interest;

    // Prompt o'zbek tilida yozilishi kerak, natija JSON bo'ladi
    const prompt = `
    Sen Baramiz AI marshrut generatorisan. O'zbekistondagi real geografik joylar va vaqtlarini bilasan.
    Foydalanuvchi quyidagi ma'lumotlarni berdi:
    - Shahar: ${location}
    - Vaqt: ${time}
    - Qiziqishlar: ${interestString}

    QOIDALAR:
    1) Marshrutni faqat shu vaqtga moslab tuz.
    2) Marshrut 2 dan 4 tagacha joydan iborat bo'lsin.
    3) "description" (ta'rif) tushunarli va qiziqarli bo'lsin (O'zbek tilida yozing).
    4) "image_prompt" maydoniga joyning SIFATLI, FOTOREALISTIK inglizcha ta'rifini kiriting (rasm generatsiya qilish uchun). Faqat ingliz tilida yozing.
    5) Yakunda umumiy sarflangan vaqtni ("total_trip_time") hisobla.

    Javobni faqat JSON formatida qaytar.
    `;

    // JSON Schema
    const routeSchema = {
        type: "OBJECT", properties: {
            total_trip_time: { type: "STRING", description: "Umumiy marshrutga ketgan vaqt (misol: 2 soat 15 minut)" },
            route: {
                type: "ARRAY", items: {
                    type: "OBJECT", properties: {
                        name: { type: "STRING", description: "Joyning nomi (O'zbek tilida)" },
                        description: { type: "STRING", description: "Joyning qisqacha ta'rifi (O'zbek tilida)" },
                        travel_time: {
                            type: "STRING", description: "Oldingi joydan bu joyga borish vaqti (misol: 10 minut piyoda)"
                        },
                        stay_time: {
                            type: "STRING", description: "Bu joyda qolishga tavsiya etilgan vaqt (misol: 1 soat)"
                        },
                        total: { type: "STRING", description: "Bu joyga borish va unda qolish uchun ketgan umumiy vaqt" },
                        image_prompt: {
                            type: "STRING",
                            description: "A detailed, photorealistic English description suitable for high-quality image generation of this specific location."
                        },
                    }, required: ["name", "description", "travel_time", "stay_time", "total", "image_prompt"]
                }
            }
        }, required: ["total_trip_time", "route"]
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        try {
            const response = await fetch(apiUrl, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }], generationConfig: {
                        responseMimeType: "application/json", responseSchema: routeSchema,
                    }
                })
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API so'rovi xatosi: ${response.status} - ${errorBody.error?.message || 'Noma\'lum xato'}`);
            }

            const result = await response.json();
            const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (jsonText) {
                const cleanJsonText = jsonText.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanJsonText);
            }
            throw new Error("AI dan bo'sh yoki noto'g'ri JSON javobi keldi.");

        } catch (error) {
            attempts++;
            if (attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1))); // Exponential backoff
            } else {
                throw new Error(`AI marshrutini generatsiya qilishda xatolik yuz berdi. Tafsilot: ${error.message}`);
            }
        }
    }
};

const generateImage = async (prompt) => {
    // To'lovli API chaqiruvlari o'rniga, joy nomini ko'rsatuvchi bepul placeholder ishlatiladi.
    const locationName = prompt.split(',')[0].trim();
    const encodedText = encodeURIComponent(locationName || "Travel Destination");

    // Yuqori kontrastli va jozibali placeholder URL qaytariladi.
    return `https://placehold.co/1600x900/1E3A8A/BFDBFE?text=${encodedText.replace(/\s/g, '+')}&font=sans-serif`;
};

const CreateRoute = ({ city, time, interest, onBack }) => {
    // State management for AI results and loading
    const [routeResult, setRouteResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imageUrls, setImageUrls] = useState({});

    const interestDisplay = Array.isArray(interest) ? interest.join(", ") : interest;
    const InterestIcon = getInterestIcon(interestDisplay);

    const fetchRoute = useCallback(async () => {
        setLoading(true);
        setError(null);
        setRouteResult(null);
        setImageUrls({});

        let routeData;
        try {
            // 1. Marshrut matnini generatsiya qilish
            routeData = await generateTextRoute({ location: city, time, interest });
            setRouteResult(routeData);

            // 2. Agar matn generatsiya qilinsa, rasmlarni yuklash
            if (routeData && routeData.route) {
                await generateImagesForRoute(routeData.route);
            }
        } catch (err) {
            console.error("Route generation failed:", err);
            setError(err.message || "Marshrutni generatsiya qilishda kutilmagan xato yuz berdi.");
        } finally {
            setLoading(false);
        }
    }, [city, time, interest]);

    useEffect(() => {
        // Scroll to top as requested in user's original code
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchRoute();
    }, [fetchRoute]);

    const generateImagesForRoute = async (route) => {
        setImageLoading(true);
        const imagePromises = route.map(async (item, index) => {
            if (item.image_prompt) {
                try {
                    const url = await generateImage(item.image_prompt);
                    setImageUrls(prev => ({ ...prev, [index]: url }));
                } catch (error) {
                    setImageUrls(prev => ({ ...prev, [index]: 'error' }));
                    console.error(`Error generating image for step ${index + 1}:`, error);
                }
            }
        });

        await Promise.all(imagePromises);
        setImageLoading(false);
    };

    const overallLoading = loading || imageLoading;

    return (<div className="pb-20 pt-8 bg-gray-50 min-h-screen">
        <Container>
            {/* Orqaga tugmasi */}
            <div className="mt-8 mb-6">
                {onBack && (<button
                    onClick={onBack}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 font-semibold text-lg transition duration-200"
                >
                    <ChevronLeft className="w-6 h-6" />
                    Составить другой маршрут
                </button>)}
            </div>

            {/* Sarlavha */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                <MapPin className="inline-block w-8 h-8 mr-3 text-orange-500 flex-shrink-0" />
                Маршрут для <span className="text-orange-500">{city}</span>
            </h1>

            {/* Parametrlar */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-xl text-gray-700 mb-12 border-b pb-4">
                <p className="flex items-center gap-2">
                    <Timer className="w-6 h-6 text-orange-500" />
                    Время: {time}
                </p>
                <p className="flex items-center gap-2">
                    {InterestIcon}
                    Интерес: {interestDisplay}
                </p>
            </div>

            {/* Loading / Error Messages */}
            {overallLoading && (
                <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-xl shadow-lg mb-8">
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-yellow-600 animate-spin mb-4" />
                        <p className="text-xl font-semibold text-yellow-800 mb-2">Маршрут генерируется...</p>
                        {loading && <p className="text-sm text-yellow-700">1/2: Создание схемы маршрута (AI)...</p>}
                        {imageLoading && !loading &&
                            <p className="text-sm text-yellow-700">2/2: Генерация изображений (AI Image)...</p>}
                    </div>
                </div>)}

            {error && (<div
                className="text-center p-8 bg-red-50 border border-red-400 text-red-700 rounded-xl shadow-lg mb-8">
                <p className="font-bold text-xl mb-2">Произошла ошибка!</p>
                <p className="mb-4">ИИ не смог создать маршрут по заданным параметрам. ({error})</p>
                <button
                    onClick={fetchRoute}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                    Повторить попытку
                </button>
            </div>)}

            <h2 className="text-3xl font-bold mb-8 flex items-center text-gray-800">
                <MapPin className="w-7 h-7 mr-3 text-orange-500" />
                Рекомендованные места
            </h2>

            {/* AI Generated Route Content */}
            {routeResult && routeResult.route ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {routeResult.route.map((item, i) => {
                    const imageUrl = imageUrls[i];
                    const isImageReady = imageUrl && imageUrl !== 'error';

                    return (<div
                        key={i}
                        className="rounded-xl overflow-hidden shadow-xl border border-gray-100 bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02]"
                    >

                        {/* Rasm ko'rsatish maydoni */}
                        <div
                            className="h-[200px] rounded-t-xl overflow-hidden w-full aspect-video bg-gray-100 flex items-center justify-center">
                            {isImageReady ? (<img
                                src={imageUrl}
                                alt={`Rasm: ${item.name}`}
                                className="w-full h-full object-cover transition-opacity duration-500"
                                loading="lazy"
                            />) : imageUrl === 'error' ? (
                                <p className="text-red-500 text-center text-sm p-4 flex items-center justify-center gap-1">
                                    <Info className='w-4 h-4' />
                                    Нет изображения.
                                </p>) : (<div className="flex flex-col items-center justify-center p-4">
                                    <div
                                        className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mb-2"></div>
                                    <p className="text-gray-500 text-sm text-center">Генерация
                                        изображения...</p>
                                </div>)}
                        </div>

                        <div className="p-5">
                            <p className="text-xl font-bold text-gray-800 mb-2">
                                {i + 1}. {item.name}
                            </p>

                            <p className="text-gray-600 mb-3 text-sm italic">{item.description}</p>

                            <div className="flex flex-col gap-1 text-sm pt-2 border-t border-gray-100">
                                <p className="text-gray-700 flex items-center gap-1">
                                    <Timer className="w-4 h-4 text-orange-500" />
                                    Время посещения: <span className='font-semibold'>{item.stay_time}</span>
                                </p>
                                <p className="text-gray-700 flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    Время в пути: <span className='font-semibold'>{item.travel_time}</span>
                                </p>
                                <p className="text-lg font-bold text-blue-700 flex items-center gap-1 mt-2">
                                    Всего на пункт: {item.total}
                                </p>
                            </div>
                        </div>
                    </div>);
                })}
            </div>) : !overallLoading && !error ? (<div
                className="p-4 bg-orange-100 border border-orange-400 rounded-xl text-orange-800 flex items-center gap-3">
                <Info className="w-6 h-6" />
                <p>К сожалению, AI не смог подобрать маршрут по {interestDisplay} на {time}. Попробуйте изменить
                    параметры.</p>
            </div>) : null}

            {routeResult && !overallLoading && (
                <p className="text-2xl font-extrabold mt-12 pt-4 border-t-2 border-dashed border-gray-300 text-gray-800 text-center">
                    Общее время поездки: <span className="text-orange-500">{routeResult.total_trip_time}</span>
                </p>)}
        </Container>
    </div>);
}

export default CreateRoute;
