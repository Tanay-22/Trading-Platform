import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const AssetTable = () =>
{
    return (
        // Columns -> Coin, Symbol, Volume, Market Cap, 24H, price
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Coin</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Market Cap</TableHead>
                    <TableHead>24 Hrs</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[1,1,1,1,1,1,1,1,1,1,1].map((item, index) => (
                    <TableRow key = {index}>
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
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AssetTable;