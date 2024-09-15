import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {VerifiedIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Button} from "@/components/ui/button.jsx";
import AccountVerificationForm from "@/page/profile/AccountVerificationForm.jsx";
import {useSelector} from "react-redux";

const Profile = () =>
{
    const auth = useSelector(store => store.auth);

    const handleEnableTwoStepsVerification = () =>
    {

    };

    return (
        <div className="flex flex-col items-center mb-5">

            <div className="pt-10 w-full lg:w-[60%]">

                <Card>
                    <CardHeader>
                        <CardTitle>Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="lg:flex gap-32">
                            <div className="space-y-7">
                                <div className="flex">
                                    <p className="w-[9rem]">Email : </p>
                                    <p className="text-gray-500">{auth.user?.email}</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Full Name : </p>
                                    <p className="text-gray-500">{auth.user?.fullName}</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Date of Birth :</p>
                                    <p className="text-gray-500">22/10/2002</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Nationality : </p>
                                    <p className="text-gray-500">Indian</p>
                                </div>
                            </div>

                            <div className="space-y-7">
                                <div className="flex">
                                    <p className="w-[9rem]">Email : </p>
                                    <p className="text-gray-500">knull@darkworld</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Full Name : </p>
                                    <p className="text-gray-500">Tanay Pandey</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Date of Birth :</p>
                                    <p className="text-gray-500">22/10/2002</p>
                                </div>

                                <div className="flex">
                                    <p className="w-[9rem]">Nationality : </p>
                                    <p className="text-gray-500">Indian</p>
                                </div>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                <div className="mt-6">

                    <Card className="w-full">
                        <CardHeader className="pb-7">

                            <div className="flex items-center gap-3">
                                <CardTitle>Two-steps Verification </CardTitle>
                                {auth.twoFactorAuth?.isEnabled ?
                                    <Badge className={"space-x-2 text-2hite bg-green-600"}>
                                        <VerifiedIcon/>
                                        Enabled
                                    </Badge>
                                    :
                                    <Badge className="bg-orange-500">Disabled</Badge>
                                }
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>Enable Two Steps Verification</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Verify your Account</DialogTitle>
                                        </DialogHeader>

                                        <AccountVerificationForm handleSubmit={handleEnableTwoStepsVerification}/>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;