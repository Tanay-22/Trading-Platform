import {Input} from "@/components/ui/input.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {DotIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";

const TradingForm = () =>
{
    const [orderType, setOrderType] = useState("BUY");

    const handleOrderTypeChange = (orderType) =>
    {
        setOrderType(orderType);
    };


    return (
        <div className="space-y-10 p-5">
            <div>
                <div className="flex gap-4 items-center justify-between">
                    <Input
                        className="py-7 focus: outline-none"
                        placeholder="Enter Amount..."
                        type="number"
                        name="amount"
                    />
                    <div>
                        <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
                            4563
                        </p>
                    </div>
                </div>
                {!true &&
                    <h1 className="text-red-600 text-center pt-4">Insufficient wallet balance</h1>
                }
            </div>
            <div className="flex gap-5 items-center">
                <div>
                    <Avatar>
                        <AvatarImage
                            src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}
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
                        <p className="text-xl font-bold">₹4500</p>
                        <p className="text-red-600">
                            <span>-13113123.3463</span>
                            <span>(-0.3523%)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">

                <p>Order Type</p>
                <p>Market Order</p>

            </div>

            <div className="flex items-center justify-between">
                <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
                <p>{orderType === "BUY" ? 9000 : 34.75}</p>
            </div>

            <div>
                <Button
                    className={`w-full py-6 text-lg text-white ${orderType === "SELL" ? "bg-red-600" : "bg-green-600"}`}
                >
                    {orderType}
                </Button>
                <Button
                    variant="link"
                    className="w-full mt-5 text-xl"
                    onClick={() => handleOrderTypeChange(orderType === "BUY" ? "SELL" : "BUY")}
                >
                    {orderType === "BUY" ? "Or Sell" : "Or Buy"}
                </Button>
            </div>
        </div>
    );
};

export default TradingForm;