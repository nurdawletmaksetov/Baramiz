import { Star, MessageCircle, Zap, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { BsTranslate } from "react-icons/bs";
import { CiBookmarkCheck } from "react-icons/ci";
import { MdOutlineSecurityUpdateGood } from "react-icons/md";
import { RiChatSmileAiLine } from "react-icons/ri";

export const whyUs = [
    {
        id: 1,
        icon: <RiChatSmileAiLine />,
        title: "Sun’iy intellekt yordamidagi chat",
        desc: "Bizning AI chatimiz bilan tez va oson muloqot qilishingiz mumkin, savollaringizga aniq va foydali javoblar beradi."
    },
    {
        id: 2,
        icon: <MdOutlineSecurityUpdateGood />,
        title: "Ishonchli va aniq ma’lumotlar",
        desc: "Saytdagi barcha joylar va ma’lumotlar tekshirilgan va ishonchli."
    },
    {
        id: 3,
        icon: <Calendar />,
        title: "Sayohatni rejalashtirish",
        desc: "Sizning vaqtingiz va qiziqishlaringizga qarab sayohat rejasini tuzib beradi."
    },
    {
        id: 4,
        icon: <Zap />,
        title: "Tez va qulay navigatsiya",
        desc: "Intuitiv interfeys kerakli ma’lumotni oson topishga imkon beradi."
    },
    {
        id: 5,
        icon: <BsTranslate />,
        title: "4 tilda qo‘llab-quvvatlash",
        desc: "Biz rus, ingliz, o‘zbek va qoraqalpoq tillarida yordam beramiz."
    },
    {
        id: 6,
        icon: <CiBookmarkCheck />,
        title: "Bookingni xizmati",
        desc: "Foydalanuvchilar sayt orqali istalgan joyni oldindan onlayn tarzda band qilish imkoniga ega."
    }


];

const WhyUs = () => {
    return (
        <div className="mt-[50px] sm:mt-[100px]">
            <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1 }}
                variants={{
                    hidden: { opacity: 0, scale: .9 },
                    visible: { opacity: 1, scale: 1 }
                }}
                className="text-center text-[24px] sm:text-[32px] font-semibold mb-10"
            >
                Nimaga bizning xizmat?
            </motion.h2>

            <div
                className="mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-8 px-4 justify-items-center"
            >
                {whyUs.map((item) => (
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
                        className="bg-white rounded-[20px] shadow-md p-6 flex flex-col items-center min-h-[280px] text-center gap-4 w-full max-w-[320px]"
                    >
                        <div className="icon text-2xl bg-gray-300 p-3 rounded-full">{item.icon}</div>

                        <h3 className="text-[20px] font-semibold">{item.title}</h3>

                        <p className="text-gray-600 text-[16px] leading-[22px]">
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div >
    );
};

export default WhyUs;
