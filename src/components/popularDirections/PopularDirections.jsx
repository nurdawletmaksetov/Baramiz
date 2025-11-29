import cities from "../../data/data.json";

const PopularDirections = () => {
    const popular = cities.slice(0, 3); // faqat 3 ta shahar

    return (
        <div className="mt-[120px]">
            <h2 className="text-center text-[32px] font-semibold mb-10">
                Популярные направления
            </h2>

            <div className="flex justify-center gap-6">
                {popular.map((item, i) => (
                    <div
                        key={item.id}
                        className="w-[300px] bg-white rounded-[20px] shadow-md pb-5 relative"
                    >
                        <div className="absolute top-3 left-3 bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                            {i + 1}
                        </div>

                        <img
                            src={item.image}
                            className="w-full h-[200px] rounded-t-[20px] object-cover"
                            alt=""
                        />

                        <div className="px-4 mt-4 flex flex-col gap-2">
                            <h3 className="font-medium text-[18px]">
                                {item.name}
                            </h3>

                            <p className="text-[#FF6D00] text-[20px] font-semibold">
                                $30.99
                            </p>

                            <div className="flex items-center gap-1 text-[18px] text-gray-700">
                                ⭐ <span>{item.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-[30px]">
                <button className="rounded-[30px] py-2.5 px-5 bg-[#F9F4FF] text-yellowred">Посмотреть {">"}</button>
            </div>
        </div>
    );
};

export default PopularDirections;