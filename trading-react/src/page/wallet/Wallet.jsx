import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    DownloadIcon,
    IndianRupeeIcon,
    WalletIcon,
    CopyIcon,
    UploadIcon,
    ArrowRightLeftIcon, HistoryIcon, ShuffleIcon
} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/wallet/TopupForm.jsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import WithdrawalRequestForm from "@/page/wallet/WithdrawalRequestForm.jsx";
import TransferForm from "@/page/wallet/TransferForm.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {depositMoney, getTransactionHistory, getUserWallet} from "@/state/wallet/Action.js";
import {useLocation, useNavigate} from "react-router-dom";

const Wallet = () =>
{
    const wallet = useSelector(store => store.wallet);
    const dispatch = useDispatch();
    const query = new URLSearchParams(useLocation().search);

    const orderId = query.get("order_id");
    const stripePaymentId = query.get("payment_id");
    const razorpayPaymentId = query.get("razorpay_payment_id");

    const navigate = useNavigate();

    useEffect(() =>
    {
        handleFetchUserWallet();
        // handleFetchWalletTransactions();
    }, []);

    useEffect(() =>
    {
        dispatch(depositMoney(
            {
                orderId,
                paymentId: razorpayPaymentId || stripePaymentId,
                navigate
            }
        ));
    }, [orderId, stripePaymentId, razorpayPaymentId]);


    const handleFetchUserWallet = () =>
    {
        dispatch(getUserWallet());
    }

    const handleFetchWalletTransactions = () =>
    {
        dispatch(getTransactionHistory());
    }

    return (
        <div className="flex flex-col items-center">
            <div className="pt-10 w-full lg:w-[60%]">
                <Card>
                    <CardHeader className="pb-9">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-5">
                                <WalletIcon size={30} />
                                <div>
                                    <CardTitle className="text-2xl pb-3">My Wallet</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <p className="text-gray-200 text-sm">
                                            #{wallet?.userWallet.id}
                                        </p>
                                        <CopyIcon size={15}
                                            className="cursor-pointer hover:text-slate-300"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReloadIcon
                                    onClick={handleFetchUserWallet}
                                    className="w-6 h-6 cursor-pointer hover:text-gray-400" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <IndianRupeeIcon />
                            <span className="text-2xl font-semibold">
                                {wallet?.userWallet.balance}
                            </span>
                        </div>

                        <div className="flex gap-7 mt-5">

                            {/*     ADD MONEY DIALOG    */}
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <UploadIcon />
                                        <span className="text-sm mt-2">Add Money</span>
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-xl">
                                            Top Up your Wallet
                                        </DialogTitle>
                                    </DialogHeader>
                                    <TopupForm />
                                </DialogContent>
                            </Dialog>

                            {/*  WITHDRAW MONEY DIALOG   */}
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <DownloadIcon />
                                        <span className="text-sm mt-2">Withdraw Money</span>
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-xl">
                                            Request Withdrawal
                                        </DialogTitle>
                                    </DialogHeader>
                                    <WithdrawalRequestForm />
                                </DialogContent>
                            </Dialog>

                            {/*     TRANSFER MONEY  */}
                            <Dialog>
                                <DialogTrigger>
                                    <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col
                                    items-center justify-center rounded-md shadow-slate-800 shadow-md">
                                        <ArrowRightLeftIcon />
                                        <span className="text-sm mt-2">Transfer Money</span>
                                    </div>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center text-xl">
                                            Transfer to Other Wallet
                                        </DialogTitle>
                                    </DialogHeader>
                                    <TransferForm />
                                </DialogContent>
                            </Dialog>

                        </div>
                    </CardContent>
                </Card>

                {/*     HISTORY     */}

                <div className="py-5 pt-10">
                    <div className="flex gap-2 items-center pb-5">
                        <h1 className="text-2xl font-semibold">History</h1>
                        <HistoryIcon className="h-7 w-7 p-0 cursor-pointer hover: text-gray-400"/>
                    </div>

                    <div className="space-y-5">
                        {[1,1,1,1,].map((item, index) => (
                            <div key={index}>
                                <Card className="px-5 flex justify-between items-center p-2">

                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            <AvatarFallback>
                                                <ShuffleIcon className="text-green-500"/>
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="space-y-1">
                                            <h1>Buy Asset</h1>
                                            <p className="text-sm text-gray-500">12-09-2024</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className={`text-green-500`}>₹999</p>
                                    </div>
                                </Card>
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;