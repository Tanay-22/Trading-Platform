import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp.jsx";
import {useState} from "react";

const AccountVerificationForm = () =>
{
    const [value, setValue] = useState("");

    const handleSubmit = () =>
    {
        console.log(value);
    };


    return (
        <div className="flex justify-center">
            <div className="space-y-5 mt-10 w-full">
                <div className="flex justify-between items-center">
                    <p>Email :</p>
                    <p>knull@necro.com</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button>Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className="py-5 flex gap-10 justify-between items-center">
                                <InputOTP
                                    maxLength={6}
                                    value={value}
                                    onChange={(value) => setValue(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button
                                        className="w-[10rem]"
                                        onClick={handleSubmit}
                                    >
                                        Verify
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default AccountVerificationForm;