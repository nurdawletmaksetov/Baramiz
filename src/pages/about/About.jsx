import { Container } from "../../container/container"
import Traveller from "../../assets/picture.png"
import Baggage from "../../assets/baggage.svg"
import Book from "../../assets/book.svg"
import Card from "../../assets/card.svg"
import { motion } from "motion/react";

const About = () => {
    return (
        <>
            <div className="">
                <Container>
                    <section className="pt-5 pb-25">
                        <div>
                            <motion.h1
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 1 }}
                                transition={{ duration: 1 }}
                                variants={{
                                    hidden: { opacity: 0, scale: .9 },
                                    visible: { opacity: 1, scale: 1 }
                                }}
                                className="pb-2 text-black text-center font-semibold text-[36px]"
                            >
                                О проекте
                            </motion.h1>
                            <div className="flex gap-[75px] items-center">
                                <div
                                    className="w-[50%]">
                                    <motion.img
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 1 }}
                                        transition={{ duration: 1 }}
                                        variants={{
                                            hidden: { opacity: 0, x: -50 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                        src={Traveller}
                                        className="w-full object-cover"
                                        alt="Traveller"
                                    />
                                </div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 1 }}
                                    transition={{ duration: 1 }}
                                    variants={{
                                        hidden: { opacity: 0, x: 50 },
                                        visible: { opacity: 1, x: 0 }
                                    }}
                                    className="flex w-[50%] flex-col justify-center gap-[26px]">
                                    <h3 className="text-[36px] text-black font-medium leading-tight">
                                        Сервис, созданный для того,
                                        чтобы туристы могли легко путешествовать
                                        по региону и находить самые интересные
                                        места без гида.
                                    </h3>
                                    <p className="text-gray-500 text-[18px]">
                                        Мы верим, что Каракалпакстан — уникальный
                                        регион с культурой, природой и историей.
                                        Мы сделали сервис, который помогает открыть его всем.
                                    </p>
                                </motion.div>
                            </div>
                            <div className="mt-[100px] flex justify-between gap-[30px]">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 1 }}
                                    transition={{ duration: 1 }}
                                    variants={{
                                        hidden: { opacity: 0, scale: .9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    className="w-1/3 bg-white rounded-[30px] p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-10">
                                        <img src={Baggage} alt="Baggage" className="w-10" />
                                    </div>
                                    <h4 className="text-[24px] font-bold text-black mb-4">Любая экспертиза</h4>
                                    <p className="text-gray-500">
                                        Мы собираем информацию от опытных путешественников
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 1 }}
                                    transition={{ duration: 1 }}
                                    variants={{
                                        hidden: { opacity: 0, scale: .9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    className="w-1/3 bg-white rounded-[30px] p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-10">
                                        <img src={Book} alt="Book" className="w-10" />
                                    </div>
                                    <h4 className="text-[24px] font-bold text-black mb-4">С любовью к региону</h4>
                                    <p className="text-gray-500">
                                        Каждый маршрут создан о сохранении культурного наследия
                                    </p>
                                </motion.div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 1 }}
                                    transition={{ duration: 1 }}
                                    variants={{
                                        hidden: { opacity: 0, scale: .9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }} className="w-1/3 bg-white rounded-[30px] p-10 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-10">
                                        <img src={Card} alt="Card" className="w-10" />
                                    </div>
                                    <h4 className="text-[24px] font-bold text-black mb-4">Для всех</h4>
                                    <p className="text-gray-500">
                                        Маршруты для всех интересов, бюджетов и физических уровней
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>
                </Container>
            </div >
        </>
    )
}

export default About