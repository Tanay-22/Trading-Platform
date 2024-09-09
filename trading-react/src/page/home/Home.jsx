import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import AssetTable from "@/page/home/AssetTable.jsx";
import StockChart from "@/page/home/StockChart.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {Cross1Icon, DotIcon} from "@radix-ui/react-icons";
import {MessageCircle} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";

const Home = () =>
{
    const [category, setCategory] = useState("all");
    const [inputValue, setInputValue] = useState("");
    const [isBotRelease, setIsBotRelease] = useState(false);

    const buttons =
        [
            {title: "All", value: "all"},
            {title: "Top 50", value: "top50"},
            {title: "Top Gainers", value: "topGainers"},
            {title: "Top Losers", value: "topLosers"},
        ]

    const handleCategoryChange = (value) =>
    {
        setCategory(value);
    }

    const handlePromptChange = (e) =>
    {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) =>
    {
        if(e.key === "Enter")
        {
            console.log(inputValue);
            setInputValue("");
        }
    }

    const handleBotRelease = () => setIsBotRelease(!isBotRelease);

    return (
        <div className="relative">
            <div className="lg:flex">
                <div className="lg:w-[50%] lg:border-r">

                    <div className="p-3 flex items-center gap-4">

                        {buttons.map(item => (
                            <Button
                                key={item.value}
                                className="rounded-full"
                                variant={category === item.value ? "default" : "outline"}
                                onClick={() => handleCategoryChange(item.value)}
                            >
                                {item.title}
                            </Button>
                        ))}
                    </div>
                    <AssetTable />
                </div>

                <div className="hidden lg:block lg:w-[50%] p-5">
                    <StockChart />

                    <div className="flex gap-5 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage
                                    src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                                />
                            </Avatar>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>BTC</p>
                                <DotIcon className="text-gray-400"/>
                                <p className="text-gray-400">Bitcoin</p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-xl font-bold">56575</p>
                                <p className="text-red-600">
                                    <span>-131</span>
                                    <span>(-0.54%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">

                {/* CHAT BOT */}
                {isBotRelease && <div className="rounded-md w-[20rem] md:w-[25rem] lg:[25rem] h-[70vh] bg-slate-900">
                    <div className="flex justify-between items-center border-b px-6 h-[12%]">
                        <p>Chat Bot</p>
                        <Button
                            variant="ghost" size="icon"
                            onClick={handleBotRelease}
                        >
                            <Cross1Icon/>
                        </Button>
                    </div>

                    <div className="h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">

                        <div className="self-start pb-5 w-auto">
                            <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                                <p>
                                    Hemlo from Chat Bot,mnesarchum ei placerat habitant
                                    parturient detracto mei molestie urna dictumst
                                </p>
                            </div>
                        </div>

                        {
                            [1, 1, 1, 1, 1, 1].map((item, index) => (
                                <div key={index}
                                     className={`${index % 2 === 0 ? "self-start" : "self-end"} pb-5 w-auto`}
                                >

                                    {index % 2 === 0 ?
                                        <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                                            <p>
                                                Prompt who are you?
                                            </p>
                                        </div>
                                        :
                                        <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                                            <p>
                                                I am Doge
                                            </p>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className="h-[12%] border-t">

                        <Input
                            className="w-full h-full order-none outline-none"
                            placeholder="Write Prompt"
                            onChange={handlePromptChange}
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                        />

                    </div>
                </div>}

                <div className="relative w-[10rem] cursor-pointer group">
                <Button
                    className="w-full h-[3rem] gap-2 items-center"
                    onClick={handleBotRelease}
                >
                        <MessageCircle
                            size={30}
                            className="fill-[#1e293b] -rotate-90 stroke-none group-hover: fill-[#1a1a1a]"
                        />
                        <span className="text-2xl">Chat Bot</span>
                </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;