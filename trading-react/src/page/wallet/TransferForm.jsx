import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {transferMoney} from "@/state/wallet/Action.js";

const TransferForm = () =>
{
    const wallet = useSelector(store => store.wallet);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(
    {
        amount: "",
        walletId: "",
        purpose: ""
    });

    const handleChange = (e) =>
    {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () =>
    {
        dispatch(transferMoney(
            {
                walletId: formData.walletId,
                reqData:
                {
                    amount: formData.amount,
                    purpose: formData.purpose
                }
            }
        ))
        console.log(formData);
    };

    return (
        <div className="pt-10 space-y-5">
            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    name="amount"
                    type="number"
                    onChange={handleChange}
                    value={formData.amount}
                    className="py-7"
                    placeholder="₹9999"
                />
            </div>

            <div>
                <h1 className="pb-1">Wallet Id</h1>
                <Input
                    name="walletId"
                    onChange={handleChange}
                    value={formData.walletId}
                    className="py-7"
                    placeholder="#AE#$%YI"
                />
            </div>

            <div>
                <h1 className="pb-1">Purpose</h1>
                <Input
                    name="purpose"
                    onChange={handleChange}
                    value={formData.purpose}
                    className="py-7"
                    placeholder="gift to your friend..."
                />
            </div>

            <DialogClose className="w-full">
                <Button
                    className="w-full py-7 text-xl"
                    onClick={handleSubmit}
                >
                    Transfer
                </Button>
            </DialogClose>
        </div>
    );
};

export default TransferForm;