import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";
import {LandmarkIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";

const WithdrawalRequestForm = () =>
{
    const [amount, setAmount] = useState();

    const handleAmountChange = (e) =>
    {
        setAmount(e.target.value);
    };

    const handleSubmit = () =>
    {
        console.log(amount);
    };


    return (
        <div className="pt-10 space-y-5">

            <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">

                <p>Available Balance</p>
                <p>₹9000</p>

            </div>
            <div className="flex flex-col items-center">
                <h1>Enter Withdrawal Amount</h1>
                <div className="flex items-center justify-center">
                    <Input
                        type="number"
                        onChange={handleAmountChange}
                        value={amount}
                        className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl
                            text-center"
                        placeholder="₹9999"
                    />
                </div>
            </div>

            <div>
                <p className="pb-2">Transfer To</p>
                <div className="flex items-center gap-5 border px-5 py-5 rounded-md">
                    <LandmarkIcon className="h-8 w-8"/>
                    <div>
                        <p className="text-xl font-bold">Punjab National Bank</p>
                        <p className="text-xs">*************5678</p>
                    </div>
                </div>
            </div>


            <DialogClose className="w-full">
                <Button
                    className="w-full py-7 text-xl"
                    onClick={handleSubmit}
                >
                    Withdraw
                </Button>
            </DialogClose>

        </div>
    );
};

export default WithdrawalRequestForm;