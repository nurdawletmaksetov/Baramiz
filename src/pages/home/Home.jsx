import { useNavigate } from "react-router-dom";
import { Container } from "../../container/container";
import MainImage from "../../assets/mainimg.svg"
import { Flex, MultiSelect, Select } from "@mantine/core";

const Home = () => {

    const nav = useNavigate();

    return (
        <main>
            <Container>
                <section>
                    <div>
                        <div className="flex gap-[78px] justify-between items-center">
                            <div className="flex w-[50%] flex-col gap-[38px]">
                                <div className="flex flex-col gap-3.5">
                                    <h1 className="font-semibold text-[60px] text-black">
                                        Открой
                                        <span className="text-yellowred">
                                            {' '}
                                            Каракалпакстан
                                            {' '}
                                        </span>
                                        с готовыми маршрутами
                                    </h1>
                                    <p className="font-medium text-[22px]">
                                        Найди лучшие места региона за пару кликов
                                        — выбери город, время и интерес,
                                        а мы составим идеальный путь.
                                    </p>
                                </div>
                                <button onClick={() => nav("/routes")} className="py-[18px] w-[155px] text-white font-bold px-10 bg-yellowred rounded-full">
                                    Начать
                                </button>
                            </div>
                            <div className="w-[50%]">
                                <img src={MainImage} />
                            </div>
                        </div>
                        <div className="mt-[100px] pt-[45px] pb-[30px] flex flex-col gap-[55px] px-10 bg-yellowred rounded-xl">
                            <Flex justify={"space-between"}>
                                <div>
                                    <label className="pb-3 font-medium text-white">
                                        Город
                                    </label>
                                    <Select
                                        variant="transparent"
                                        bd={"1px solid white"}
                                        bdrs={"md"}
                                        w={"295px"}
                                        className="text-white"
                                        placeholder="Выберите город"
                                        autoSelectOnBlur
                                        searchable
                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                    />
                                </div>
                                <div>
                                    <label className="pb-3 font-medium text-white">
                                        Время
                                    </label>
                                    <Select
                                        variant="transparent"
                                        bd={"1px solid white"}
                                        bdrs={"md"}
                                        w={"295px"}
                                        className="text-white"
                                        placeholder="Выберите время"
                                        autoSelectOnBlur
                                        searchable
                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                    />
                                </div>
                                <div>
                                    <label className="pb-3 font-medium text-white">
                                        Интерес
                                    </label>
                                    <MultiSelect
                                        variant="transparent"
                                        w={"295px"}
                                        bd={"1px solid white"}
                                        bdrs={"md"}
                                        className="text-white"
                                        placeholder="Выберите время"
                                        data={['React', 'Angular', 'Vue', 'Svelte']}
                                    />
                                </div>
                            </Flex>
                            <div>
                                <button className="w-full bg-black text-white py-3.5 rounded-[10px]">Составить маршрут {'>'}</button>
                            </div>
                        </div>
                        <div>
                            {/* Baramiz AI */}
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
};

export default Home;
