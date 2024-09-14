import "./Auth.css"
import SignUpForm from "@/page/auth/SignUpForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import ForgotPasswordForm from "@/page/auth/ForgotPasswordForm.jsx";
import SignInForm from "@/page/auth/SignInForm.jsx";

const Auth = () =>
{
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="h-screen relative authContainer">
            <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">

                <div className="bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    flex flex-col justify-center items-center h-[35rem] w-[35rem] rounded-md z-50 bg-black
                    bg-opacity-50 shadow-2xl shadow-white px-10"
                >
                    <h1 className="text-6xl font-bold pb-9">Knull Trading</h1>

                    {location.pathname === "/signup" ?
                        (<section className="w-full">
                            <SignUpForm/>
                            <div className="flex items-center justify-center">
                                <span>Already have an account ?,</span>
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate("/signin")}
                                >
                                    Sign In
                                </Button>
                            </div>
                        </section>)
                        :
                        location.pathname === "/forgot-password" ?
                            (<section className="w-full">
                                <ForgotPasswordForm/>
                            </section>)
                            :
                            (<section className="w-full">
                                <SignInForm/>
                                <div className="flex items-center justify-center">
                                    <span>Don't have account?,</span>
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Sign Up
                                    </Button>
                                </div>
                                <div className="mt-10">
                                    <Button
                                        className="py-5 w-full"
                                        variant="outline"
                                        onClick={() => navigate("/forgot-password")}
                                    >
                                        Forgot Password
                                    </Button>
                                </div>
                            </section>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Auth;