import { motion } from "motion/react";
import { Container } from "../../container/container";
import { ChevronLeft, MapPin, Clock, Timer, Landmark, Leaf, ShoppingBag, BookOpen, Utensils } from "lucide-react";

const getInterestIcon = (interest) => {
    const primaryInterest = Array.isArray(interest) ? interest[0] : interest;
    const IconProps = { className: "w-6 h-6 mr-2 text-orange-500" };

    switch (primaryInterest?.toLowerCase()) {
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
            return <MapPin {...IconProps} />;
    }
};

const CreateRoute = ({ city, time, interest, selectedPlaces, onBack }) => {
    const interestDisplay = Array.isArray(interest) ? interest.join(", ") : interest;
    const interestForIcon = Array.isArray(interest) ? interest[0] : interest?.split(",")[0];
    const InterestIcon = getInterestIcon(interestForIcon);

    return (
        <div className="pb-20">
            <Container>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 1 }}
                    transition={{ duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                    }}
                >
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="mt-8 mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-1 font-semibold text-lg transition duration-200"
                        >
                            <ChevronLeft className="w-6 h-6" />
                            Orqaga
                        </button>
                    )}

                    <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
                        <MapPin className="inline-block w-8 h-8 mr-3 text-orange-500" />
                        Маршрут для <span className="text-orange-500">{city}</span>
                    </h1>

                    <div className="flex gap-8 text-xl text-gray-700 mb-12 border-b pb-4">
                        <p className="flex items-center gap-2">
                            <Timer className="w-6 h-6 text-orange-500" />
                            Vaqt: {time}
                        </p>
                        <p className="flex items-center gap-2">
                            {InterestIcon}
                            Qiziqish: {interestDisplay}
                        </p>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-3xl font-bold mb-8 flex items-center">
                            <MapPin className="w-7 h-7 mr-3 text-orange-500" />
                            Tavsiya etilgan joylar: <span className="text-orange-500 ml-2">{interestDisplay}</span>
                        </h2>
                    </div>
                </motion.div>

                {selectedPlaces.length === 0 ? (
                    <p className="text-gray-500 text-lg p-4 border rounded-xl bg-gray-50">
                        Нет подходящих мест для {interestDisplay} в {city}. Iltimos, boshqa qiziqish turini tanlang.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {selectedPlaces.map((p, idx) => (
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1 }}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                key={idx}
                                className="rounded-xl overflow-hidden shadow-xl border border-gray-100 bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.02]"
                            >
                                <img
                                    src={p.img}
                                    alt={p.title.en}
                                    className="w-full h-[200px] object-cover"
                                    loading="lazy"
                                />
                                <div className="p-5">
                                    <p className="text-xl font-bold text-gray-800 mb-2">{p.title.en}</p>
                                    <p className="text-gray-600 flex items-center gap-1">
                                        <Clock className="w-5 h-5 text-orange-500" />
                                        {p.duration} minut
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default CreateRoute;
