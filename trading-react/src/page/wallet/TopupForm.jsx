import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {DotFilledIcon} from "@radix-ui/react-icons";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";


const TopupForm = () =>
{
    const [amount, setAmount] = useState();
    const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

    const handleAmountChange = (e) =>
    {
        setAmount(e.target.value);
    };

    const handlePaymentMethodChange = (value) =>
    {
        setPaymentMethod(value);
    };

    const handleSubmit = () =>
    {
        console.log(amount, paymentMethod);
    }

    return (
        <div className="pt1-0 space-y-5">

            <div>
                <h1 className="pb-1">Enter Amount</h1>
                <Input
                    className="py-7 text-lg"
                    placeholder="₹9999"
                    onChange={handleAmountChange}
                    value={amount}
                    type="number"
                />
            </div>

            <div>
                <h1 className="pb-1">Select Payment Method</h1>
                <RadioGroup
                    className="flex"
                    defaultValue="RAZORPAY"
                    onValueChange={(value) => handlePaymentMethodChange(value)}
                >
                    <div className="flex items-center space-x-2 border p-3 px-3 rounded-md">

                        <RadioGroupItem
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="RAZORPAY"
                            id="r1"
                        />
                        <Label htmlFor="r1">
                            <div className="rounded-md w-32">
                                <img src="../../../public/razorpay.png" alt="razorpay"/>
                            </div>
                        </Label>


                    </div>

                    <div className="flex items-center space-x-2 border p-3 px-3 rounded-md">

                        <RadioGroupItem
                            icon={DotFilledIcon}
                            className="h-9 w-9"
                            value="STRIPE"
                            id="r2"
                        />
                        <Label htmlFor="r2">
                            <div className="rounded-md w-32">
                                <img src="../../../public/stripe.png" alt="razorpay"
                                    className="h-10 w-full"
                                />
                            </div>
                        </Label>
                    </div>

                </RadioGroup>
            </div>
            <Button
                onClick={handleSubmit}
                className="w-full py-7"
            >
                Submit
            </Button>

        </div>
    );
};

export default TopupForm;