import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

const ForgotPasswordForm = () =>
{
    const form = useForm({
        resolver: "",
        defaultValues:
        {
            email: "",
        }
    });

    const onSubmit = (data) =>
    {
        console.log(data);
    };


    return (
        <div>
            <h1 className="text-xl font-bold pb-3 text-center">Forgot Password</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >

                    {/* EMAIL   */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* SUBMIT  */}
                    <Button
                        type="submit"
                        className="w-full py-5"
                    >
                        Send OTP
                    </Button>


                </form>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;