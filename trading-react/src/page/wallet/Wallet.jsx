import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    DownloadIcon,
    IndianRupeeIcon,
    WalletIcon,
    CopyIcon,
    UploadIcon,
    ArrowRightLeftIcon
} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/wallet/TopupForm.jsx";
import {ReloadIcon} from "@radix-ui/react-icons";
import WithdrawalRequestForm from "@/page/wallet/WithdrawalRequestForm.jsx";

const Wallet = () =>
{
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
                                            #A475Ed
                                        </p>
                                        <CopyIcon size={15}
                                            className="cursor-pointer hover:text-slate-300"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReloadIcon className="w-6 h-6 cursor-pointer hover:text-gray-400" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <IndianRupeeIcon />
                            <span className="text-2xl font-semibold">
                                20000
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
                                    <TopupForm />
                                </DialogContent>
                            </Dialog>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Wallet;