import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form.jsx";
import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";

const PaymentDetailsForm = () =>
{
    const form = useForm({
        resolver: "",
        defaultValues:
        {
            accountHolderName: "",
            ifsc: "",
            accountNumber: "",
            confirmAccountNumber: "",
            bankName: ""
        }
    });

    const onSubmit = (data) =>
    {
        console.log(data);
    };


    return (
        <div className="px-10 py-2">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* A/C HOLDER NAME */}
                    <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>A/C Holder Name : </FormLabel>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* IFSC CODE   */}
                    <FormField
                        control={form.control}
                        name="ifsc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>IFSC Code : </FormLabel>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter ifsc code"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* A/C NUMBER  */}
                    <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>A/C Number : </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter account number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* CONFIRM A/C NUMBER  */}
                    <FormField
                        control={form.control}
                        name="confirmAccountNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm A/C Number : </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Re-Enter account number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* BANK NAME  */}
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name : </FormLabel>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter bank name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                {/* SUBMIT  */}
                    <DialogClose className="w-full">
                        <Button
                            type="submit"
                            className="w-full py-5"
                        >
                            Save
                        </Button>
                    </DialogClose>


                </form>
            </Form>
        </div>
    );
};

export default PaymentDetailsForm;