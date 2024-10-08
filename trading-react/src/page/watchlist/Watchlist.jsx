import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {BookmarkFilledIcon} from "@radix-ui/react-icons";

const Watchlist = () =>
{
    const handleRemoveFromWatchlist = () =>
    {
        console.log("removed");
    }


    return (
        <div className="p-5 lg:px-20">
            <h1 className="font-bold text-3xl pb-5">Watchlist</h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Coin</TableHead>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>24 Hrs</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right text-red-600">Remove</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium flex items-center gap-2">
                                <Avatar className="-z-50">
                                    <AvatarImage
                                        src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
                                    />
                                </Avatar>
                                <span>BitCoin</span>
                            </TableCell>
                            <TableCell>BTC</TableCell>
                            <TableCell>416464646</TableCell>
                            <TableCell>416464646</TableCell>
                            <TableCell>416464646</TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10"
                                    onClick={() => handleRemoveFromWatchlist()}
                                >
                                    <BookmarkFilledIcon className="h-6 w-6" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Watchlist;