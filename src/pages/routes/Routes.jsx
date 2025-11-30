import { useState } from "react";
import { Carousel } from "@mantine/carousel";
import regions from "../../data/data.json";
import { Container } from "../../container/container";
import CreateRoute from "../createRoute/CreateRoute";
import { motion } from "motion/react";

const Routes = () => {
    const [isRouteCreated, setIsRouteCreated] = useState(false);

    const [city, setCity] = useState(null);
    const [time, setTime] = useState(null);
    const [interest, setInterest] = useState([]);

    const times = ["1 час", "2 часа", "3 часа", "Пол дня"];
    const interests = ["History", "Museums", "Food", "Nature", "Shopping"];

    const selectedCity = regions.find((r) => r.name === city);

    const selectedPlaces = selectedCity?.categories?.[interest[0]] || [];

    const handleInterestToggle = (item) => {
        setInterest((prevInterests) => {
            if (prevInterests.includes(item)) {
                return prevInterests.filter((i) => i !== item);
            } else {
                return [...prevInterests, item];
            }
        });
    };

    const handleCreateRoute = () => {
        if (city && time && interest.length > 0) {
            setIsRouteCreated(true);
        } else {
            console.log("Please select a city, time, and at least one interest.");
        }
    };

    const interestString = interest.join(", ");

    if (isRouteCreated) {
        window.scrollTo({
            top: 0, behavior: "smooth"
        });
        return (<CreateRoute
            city={city}
            time={time}
            interest={interestString}
            selectedPlaces={selectedPlaces}
            onBack={() => setIsRouteCreated(false)}
        />);
    }

    return (<main className="px-4 py-10">
        <Container>
            <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, scale: .9 }, visible: { opacity: 1, scale: 1 }
                }} className="text-center text-4xl font-bold mb-10">
                Создай маршрут по <span className="text-orange-500">Каракалпакстану</span>
            </motion.h1>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 }
                }} className="mb-12">
                <p className="text-2xl font-semibold mb-4">1. Выберите город</p>
                <Carousel
                    slideSize="25%"
                    slideGap="lg"
                    align="start"
                    height={240}
                    withIndicators={false}
                    emblaOptions={{ dragFree: true }}
                >
                    {regions.map((c) => (<Carousel.Slide key={c.id}>
                        <div
                            onClick={() => setCity(c.name)}
                            className={`w-full h-[200px] rounded-xl overflow-hidden cursor-pointer border-4 transition relative
                                ${city === c.name ? "border-orange-500 shadow-lg" : "border-transparent"}`}
                        >
                            <img
                                src={c.image}
                                className="w-full h-full object-cover"
                                alt={c.name}
                            />
                            <p className="absolute bottom-3 left-3 text-white text-lg font-bold drop-shadow-xl">
                                {c.name}
                            </p>
                        </div>
                    </Carousel.Slide>))}
                </Carousel>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 }
                }}
                className="mb-12">
                <p
                    className="text-2xl font-semibold mb-4"
                >
                    2. Выберите время
                </p>
                <div className="grid grid-cols-4 gap-4">
                    {times.map((t) => (<button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-4 rounded-xl border text-lg transition 
                            ${time === t ? "bg-orange-500 text-white" : "text-gray-400 border-gray-300"}`}
                    >
                        {t}
                    </button>))}
                </div>
            </motion.div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 }
                }} className="mb-12">
                <p className="text-2xl font-semibold mb-4">3. Выберите интерес</p>
                <div className="grid grid-cols-3 gap-4">
                    {interests.map((i) => (<button
                        key={i}
                        onClick={() => handleInterestToggle(i)}
                        className={`py-4 rounded-xl border text-lg transition 
                                ${interest.includes(i) ? "bg-orange-500 text-white border-orange-600 shadow-md" : "text-gray-500 border-gray-300 hover:border-orange-300"}`}
                    >
                        {i}
                    </button>))}
                </div>
            </motion.div>

            <div className="flex justify-center mt-[55px]">
                <motion.button
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 1 }}
                    transition={{ duration: 1 }}
                    variants={{
                        hidden: { opacity: 0, scale: .9 }, visible: { opacity: 1, scale: 1 }
                    }}
                    onClick={handleCreateRoute}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition duration-300 font-semibold text-xl"
                >
                    Составить маршрут
                </motion.button>

            </div>
        </Container>
    </main>)
}

export default Routes
