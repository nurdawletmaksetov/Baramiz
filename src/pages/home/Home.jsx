import { useNavigate } from "react-router-dom";
import { Container } from "../../container/container";
import MainImage from "../../assets/mainimg.svg"
import BaramizChat from "../../components/aiChatBot/BaramizChat";
import PopularDirections from "../../components/popularDirections/PopularDirections";
import WhyUs from "../../components/whyUs/WhyUs";
import { motion } from "motion/react";
const Home = () => {
    const nav = useNavigate();
    return (
        <main className="pb-[120px]">
            <Container>
                <section>
                    <div>
                        <div className="flex sm:flex-row flex-col gap-5 sm:gap-[78px] justify-between items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1 }}
                                variants={{
                                    hidden: { opacity: 0, x: -50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="flex sm:w-[50%] flex-col gap-[38px]"
                            >
                                <div className="flex flex-col gap-3.5">
                                    <h1 className="font-semibold text-[25px] sm:text-[30px] lg:text-[50px] text-black">
                                        Открой
                                        <span className="text-yellowred">
                                            {' '}
                                            Каракалпакстан
                                            {' '}
                                        </span>
                                        с готовыми маршрутами
                                    </h1>
                                    <p className="font-medium text-[16px] sm:text-[22px]">
                                        Найди лучшие места региона за пару кликов
                                        — выбери город, время и интерес,
                                        а мы составим идеальный путь.
                                    </p>
                                </div>
                                <button onClick={() => nav("/routes")} className="py-2 sm:py-[18px] w-[100px] sm:w-[155px] text-white font-bold px-5 sm:px-10 bg-yellowred rounded-full">
                                    Начать
                                </button>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1 }}
                                variants={{
                                    hidden: { opacity: 0, x: 50 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                className="sm:w-[50%]"
                            >
                                <img src={MainImage} alt="Asosiy rasm" />
                            </motion.div>
                        </div>
                        <div><BaramizChat /></div>
                        <div><PopularDirections /></div>
                        <div><WhyUs /></div>
                    </div>
                </section>
            </Container>
        </main>
    );
};

export default Home;