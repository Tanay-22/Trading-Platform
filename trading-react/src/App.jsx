import './App.css'
import Navbar from "@/page/navbar/Navbar.jsx";
import Home from "@/page/home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Portfolio from "@/page/portfolio/Portfolio.jsx";
import Activity from "@/page/activity/Activity.jsx";
import Wallet from "@/page/wallet/Wallet.jsx";
import Withdrawal from "@/page/withdrawal/Withdrawal.jsx";
import PaymentDetails from "@/page/paymentDetails/PaymentDetails.jsx";
import StockDetails from "@/page/stockDetails/StockDetails.jsx";
import Watchlist from "@/page/watchlist/Watchlist.jsx";
import Profile from "@/page/profile/Profile.jsx";
import {Search} from "lucide-react";
import NotFound from "@/page/notFound/NotFound.jsx";
import Auth from "@/page/auth/Auth.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUser} from "@/state/auth/Action.js";

function App()
{
    const auth = useSelector(store => store.auth);
    const dispatch = useDispatch();

    // console.log("auth", auth);


    useEffect(() =>
    {
        dispatch(getUser(auth.jwt || localStorage.getItem("jwt")));
    },[auth.jwt]);

    return (
        <>
            {auth.user ?
                <div>
                    <Navbar/>

                    <Routes>

                        <Route path="/" element={<Home/>}/>
                        <Route path="/portfolio" element={<Portfolio/>}/>
                        <Route path="/activity" element={<Activity/>}/>
                        <Route path="/wallet" element={<Wallet/>}/>
                        <Route path="/withdrawal" element={<Withdrawal/>}/>
                        <Route path="/payment-details" element={<PaymentDetails/>}/>
                        <Route path="/market/:id" element={<StockDetails/>}/>
                        <Route path="/watchlist" element={<Watchlist/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/search-coin" element={<Search/>}/>
                        <Route path="*" element={<NotFound/>}/>


                    </Routes>
                </div>
                :
                <Auth/>
            }

        </>
    )
}

export default App
