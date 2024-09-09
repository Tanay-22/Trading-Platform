import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DragHandleHorizontalIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import coinImg from "../../../../public/Dogecoin_Logo.png"
import SideBar from "@/page/home/navbar/SideBar.jsx";

const Navbar = () =>
{
    return (
        <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-8 flex
        justify-between items-center">

            <div className="flex items-center gap-3">
                <Sheet>
                    <SheetTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full h-11 w-11"
                        >
                            <DragHandleHorizontalIcon className="h-7 w-7" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left"
                                  className="w-72 border-r-0 flex flex-col justify-center"
                    >
                        <SheetHeader>
                            <SheetTitle>
                                <div className="text-3xl flex justify-center items-center gap-1">
                                    <Avatar>
                                        <AvatarImage src = {coinImg} />
                                    </Avatar>
                                    <div>
                                        <span className="font-bold text-orange-700">Knull</span>
                                        <span>Trading</span>
                                    </div>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <SideBar />
                    </SheetContent>
                </Sheet>

                <p className="text-sm lg:text-base cursor-pointer">
                    Knull Trading
                </p>
                <div className="p-0 ml-9">
                    <Button variant="outline">
                        <MagnifyingGlassIcon />
                        <span>Search</span>
                    </Button>

                </div>
            </div>

            <div>
                <Avatar>
                    <AvatarFallback>
                        K
                    </AvatarFallback>
                </Avatar>
            </div>

        </div>
    );
};

export default Navbar;