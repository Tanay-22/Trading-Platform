import {ActivityLogIcon, BookmarkIcon, DashboardIcon, ExitIcon, HomeIcon, PersonIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.jsx";
import {SheetClose} from "@/components/ui/sheet.jsx";
import {CreditCardIcon, LandmarkIcon, WalletIcon} from "lucide-react";

const menu =
    [
        {name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6"/>},
        {name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6"/>},
        {name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6"/>},
        {name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6"/>},
        {name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6"/>},
        {name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-6 w-6"/>},
        {name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6"/>},
        {name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6"/>},
        {name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6"/>},

    ];


const SideBar = () =>
{
    return (
        <div className="mt-10 space-y-5">

            {menu.map(item => (
                <div key={item.name}>
                    <SheetClose className="w-full">
                        <Button variant="outline"
                                className="flex items-center gap-5 py-6 w-full"
                        >
                            <span className="w-8">{item.icon}</span>
                            <p>{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}
        </div>
    );
};

export default SideBar;