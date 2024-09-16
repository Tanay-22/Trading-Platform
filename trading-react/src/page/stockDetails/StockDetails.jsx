import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {BookmarkFilledIcon, BookmarkIcon, DotIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import TradingForm from "@/page/stockDetails/TradingForm.jsx";
import StockChart from "@/page/home/StockChart.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getCoinsDetails} from "@/state/coin/Action.js";

const StockDetails = () =>
{
    const [bookmark, setBookmark] = useState(false)

    const disptach = useDispatch();
    const { id } = useParams();
    const { coinDetails } = useSelector(store => store.coin);

    console.log("coinDetails", coinDetails);

    useEffect(() =>
    {
        disptach(getCoinsDetails(id));
    }, [id]);


    return (
        <div className="p-5 mt-5">
            <div className="flex justify-between">
                <div className="flex gap-5 items-center">
                    <div>
                        <Avatar>
                            <AvatarImage
                                src={coinDetails?.image.large}
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

                <div className="flex items-center gap-5">
                    <Button
                        variant="ghost"
                        onClick={() => setBookmark(!bookmark)}
                    >
                        {bookmark ?
                            <BookmarkFilledIcon className="h-6 w-6"/>
                            :
                            <BookmarkIcon className="h-6 w-6"/>
                        }
                    </Button>

                    <Dialog>
                        <DialogTrigger>
                            <Button size="lg">Trade</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>How Much do you do want to spend ?</DialogTitle>
                            </DialogHeader>
                            <TradingForm />
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div className="mt-10">
                <StockChart />
            </div>
        </div>
    );
};

export default StockDetails;