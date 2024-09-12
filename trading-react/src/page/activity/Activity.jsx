import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Activity = () =>
{
    return (
        <div className="p-5 lg:px-20">
            <h1 className="font-bold text-3xl pb-5">Activity</h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Date & Time</TableHead>
                        <TableHead>Trading Pair</TableHead>
                        <TableHead>Cost Price</TableHead>
                        <TableHead>Selling Price</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead>Profit/Loss</TableHead>
                        <TableHead className="text-right">Value</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <p>2024/09/10</p>
                                <p className="text-gray-400">23:02:33</p>
                            </TableCell>
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
                            <TableCell>$250.00</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Activity;