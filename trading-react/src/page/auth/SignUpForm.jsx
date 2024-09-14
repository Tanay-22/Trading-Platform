import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";

const SignUpForm = () =>
{
    const form = useForm({
        resolver: "",
        defaultValues:
        {
            fullName: "",
            email: "",
            password: "",
            passwordVerify: "",
            mobile: ""
        }
    });

    const onSubmit = (data) =>
    {
        console.log(data);
    };


    return (
        <div>
            <h1 className="text-xl font-bold pb-3 text-center">Create New Account</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* FULL NAME */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter full name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL   */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* MOBILE  */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter mobile number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* PASSWORD  */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Enter Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PASSWORD VERIFICATION  */}
                    <FormField
                        control={form.control}
                        name="passwordVerify"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="Verfiy Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SUBMIT  */}
                        <Button
                            type="submit"
                            className="w-full py-5"
                        >
                            Sign Up
                        </Button>



                </form>
            </Form>
        </div>
    );
};

export default SignUpForm;