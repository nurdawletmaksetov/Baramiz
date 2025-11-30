import { motion } from "motion/react";
import cities from "../../data/data.json";
import { RxStarFilled } from "react-icons/rx";

const PopularDirections = () => {
    const popular = cities.slice(0, 3);

    return (
        <div className="mb-[55px]">
            <motion.h2
                initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
                className="text-center text-[24px] sm:text-[32px] font-semibold mb-10"
            >
                Популярные направления
            </motion.h2>

            <div className="flex justify-center flex-col items-center xs:flex-row gap-6">
                {popular.map((item, i) => (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 1 }}
                        transition={{ duration: 1 }}
                        variants={{
                            hidden: { opacity: 0, scale: .9 },
                            visible: { opacity: 1, scale: 1 }
                        }}
                        key={item.id}
                        className="w-[300px] bg-white rounded-[20px] shadow-md pb-5 relative"
                    >
                        <div className="absolute top-3 left-3 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                            {i + 1}
                        </div>

                        <img
                            src={item.image}
                            className="w-full h-[150px] xs:h-[100px] sm:h-[200px] rounded-t-[20px] object-cover"
                            alt=""
                        />

                        <div className="px-4 mt-4 flex flex-col gap-2">
                            <h3 className="font-medium text-[18px]">
                                {item.name}
                            </h3>

                            <p className="text-[#FF6D00] text-[20px] font-semibold">
                                $30.99
                            </p>

                            <div className="flex gap-1 text-[18px] text-gray-700 items-center">
                                <div>
                                    <RxStarFilled className="text-yellow-400 size-5" />
                                </div>
                                <span className="mt-0.5">{item.rating}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, scale: .9 },
                    visible: { opacity: 1, scale: 1 }
                }} className="flex justify-center mt-[30px]">
                <button className="rounded-[30px] py-2 sm:py-2.5 px-3 sm:px-5 bg-[#F9F4FF] text-yellowred">Посмотреть {">"}</button>
            </motion.div>
        </div >
    );
};

export default PopularDirections;