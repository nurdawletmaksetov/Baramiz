import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import regions from "../../data/data.json";
import { Container } from "../../container/container";

const Routes = () => {
    const [city, setCity] = useState(null);
    const [time, setTime] = useState(null);
    const [interest, setInterest] = useState(null);

    const times = ["1 час", "2 часа", "3 часа", "Пол дня"];
    const interests = ["History", "Museums", "Food", "Nature", "Shopping"];

    const selectedCity = regions.find((r) => r.name === city);

    const selectedPlaces =
        selectedCity?.categories?.[interest] || [];

    return (
        <main className="px-4 py-10">
            <Container>
                <h1 className="text-center text-4xl font-bold mb-10">
                    Создай маршрут по <span className="text-orange-500">Каракалпакстану</span>
                </h1>

                <div className="mb-12">
                    <p className="text-2xl font-semibold mb-4">1. Выберите город</p>

                    <Carousel
                        slideSize="25%"
                        slideGap="lg"
                        align="start"
                        height={240}
                        withIndicators={false}
                        emblaOptions={{ dragFree: true }}
                    >
                        {regions.map((c) => (
                            <Carousel.Slide key={c.id}>
                                <div
                                    onClick={() => setCity(c.name)}
                                    className={`w-full h-[200px] rounded-xl overflow-hidden cursor-pointer border-4 transition relative
                                ${city === c.name
                                            ? "border-orange-500 shadow-lg"
                                            : "border-transparent"
                                        }`}
                                >
                                    <img
                                        src={c.image}
                                        className="w-full h-full object-cover"
                                    />
                                    <p className="absolute bottom-3 left-3 text-white text-lg font-bold drop-shadow-xl">
                                        {c.name}
                                    </p>
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>

                <div className="mb-12">
                    <p className="text-2xl font-semibold mb-4">2. Выберите время</p>

                    <div className="grid grid-cols-4 gap-4">
                        {times.map((t) => (
                            <button
                                key={t}
                                onClick={() => setTime(t)}
                                className={`py-4 rounded-xl border text-lg transition 
              ${time === t ? "bg-orange-500 text-white" : "text-gray-400 border-gray-300"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <p className="text-2xl font-semibold mb-4">3. Выберите интерес</p>

                    <div className="grid grid-cols-3 gap-4">
                        {interests.map((i) => (
                            <button
                                key={i}
                                onClick={() => setInterest(i)}
                                className={`py-4 rounded-xl border text-lg transition 
                ${interest === i
                                        ? "bg-orange-500 text-white border-orange-600"
                                        : "text-gray-500 border-gray-300"
                                    }`}
                            >
                                {i}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-yellowred text-white p-4 rounded-xl">Составить маршрут</button>
                </div>

                {city && time && interest && (
                    <div className="mt-10">
                        <h2 className="text-3xl font-bold mb-6">
                            📍 Место для: <span className="text-orange-500">{interest}</span>
                        </h2>

                        {selectedPlaces.length === 0 ? (
                            <p className="text-gray-500 text-lg">Нет подходящих мест.</p>
                        ) : (
                            <div className="grid grid-cols-3 gap-6">
                                {selectedPlaces.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl overflow-hidden shadow-lg border bg-white"
                                    >
                                        <img src={p.img} className="w-full h-[180px] object-cover" />
                                        <div className="p-4">
                                            <p className="text-xl font-semibold">
                                                {p.title.en}
                                            </p>
                                            <p className="text-gray-600 mt-1">⏱ {p.duration} минут</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </main>
    )
}

export default Routes