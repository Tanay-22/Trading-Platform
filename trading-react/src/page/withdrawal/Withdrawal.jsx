import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";

const Withdrawal = () =>
{
    return (
        <div className="p-5 lg:px-20">
            <h1 className="font-bold text-3xl pb-5">Withdrawal</h1>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="py-5">Date & Time</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Amount</TableHead>
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
                            <TableCell>Bank</TableCell>
                            <TableCell>BTC</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Withdrawal;