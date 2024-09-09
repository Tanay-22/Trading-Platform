import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import AssetTable from "@/page/home/AssetTable.jsx";
import StockChart from "@/page/home/StockChart.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {DotIcon} from "@radix-ui/react-icons";
import {MessageCircle} from "lucide-react";

const Home = () =>
{
    const [category, setCategroy] = useState("all");

    const buttons =
        [
            {title: "All", value: "all"},
            {title: "Top 50", value: "top50"},
            {title: "Top Gainers", value: "topGainers"},
            {title: "Top Losers", value: "topLosers"},
        ]

    const handleCategoryChange = (value) =>
    {
        setCategroy(value);
    }
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
                <div className="relative w-[10rem] cursor-pointer group">
                    <Button>
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