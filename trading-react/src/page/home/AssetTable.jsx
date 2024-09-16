import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {useNavigate} from "react-router-dom";

const AssetTable = ({ coins, category }) =>
{
    const navigate = useNavigate();



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
                {coins.map((item, index) => (
                    <TableRow key = {index}>
                        <TableCell
                            onClick={() => navigate(`/market/${item.id}`)}
                            className="font-medium flex items-center gap-2">
                            <Avatar className="-z-50">
                                <AvatarImage
                                    src={item.image}
                                />
                            </Avatar>
                            <span>{item.name}</span>
                        </TableCell>
                        <TableCell>{item.symbol}</TableCell>
                        <TableCell>{item.total_volume}</TableCell>
                        <TableCell>₹{item.market_cap}</TableCell>
                        <TableCell>₹{item.market_cap_change_24h}</TableCell>
                        <TableCell className="text-right">₹{item.current_price}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default AssetTable;