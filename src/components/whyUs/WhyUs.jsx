import { whyUs } from "../../data/whyUs";

const WhyUs = () => {
    return (
        <div className="mt-[140px]">
            <h2 className="text-center text-[32px] font-semibold mb-10">
                Почему наш сервис?
            </h2>

            <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {whyUs.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-[20px] shadow-md p-6 flex flex-col items-center text-center gap-4"
                    >
                        {/* ICON */}
                        <div className="text-[40px]">{item.icon}</div>

                        {/* TITLE */}
                        <h3 className="text-[20px] font-semibold">{item.title}</h3>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 text-[16px] leading-[22px]">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyUs;
