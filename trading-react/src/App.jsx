import './App.css'
import Navbar from "@/page/home/navbar/Navbar.jsx";
import Home from "@/page/home/Home.jsx";
import {Route, Routes} from "react-router-dom";
import Portfolio from "@/page/portfolio/Portfolio.jsx";
import Activity from "@/page/activity/Activity.jsx";
import Wallet from "@/page/wallet/Wallet.jsx";
import Withdrawal from "@/page/withdrawal/Withdrawal.jsx";

function App() {

  return (
    <>
        <Navbar/>

        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/wallet" element={<Wallet />} />


        </Routes>
    </>
  )
}

export default App
