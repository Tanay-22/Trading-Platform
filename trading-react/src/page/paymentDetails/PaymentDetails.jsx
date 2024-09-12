import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import PaymentDetailsForm from "@/page/paymentDetails/PaymentDetailsForm.jsx";
import {Button} from "@/components/ui/button.jsx";


const PaymentDetails = () =>
{
    return (
        <div className="px-20">
            <h1 className="text-3xl font-bold py-10">Payment Details</h1>

            {false ?
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Punjab National Bank
                        </CardTitle>

                        <CardDescription>
                            A/C No. : **********45678
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-center">
                            <p className="w-32">A/C Holder :</p>
                            <p className="text-gray-400">Cordy Torus</p>
                        </div>

                        <div className="flex items-center">
                            <p className="w-32">IFSC :</p>
                            <p className="text-gray-400">PNB90909</p>
                        </div>
                    </CardContent>
                </Card>
                :
                <Dialog>
                    <DialogTrigger>
                        <Button className="py-6">
                            Add Payment details
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                        </DialogHeader>
                        <PaymentDetailsForm/>
                    </DialogContent>
                </Dialog>
            }

        </div>
    );
};

export default PaymentDetails;