import Chart from 'react-apexcharts';
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMarketChart} from "@/state/coin/Action.js";


const timeSeries =
[
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Times Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Times Series (Weekly)",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Times Series (Monthly)",
        label: "1 Month",
        value: 30
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Times Series (Yearly)",
        label: "1 Year",
        value: 365
    },
]

const StockChart = ({ coinId }) =>
{
    const [activeLabel, setActiveLabel] = useState(1);

    const { marketChart } = useSelector(store => store.coin);

    const series =
    [
        {
            data: marketChart?.data.market_caps,
        },
    ];

    console.log("marketChart", marketChart);
    const options =
    {
        chart:
            {
                id: "area-datetime",
                type: "area",
                height: 450,
                zoom: { autoScaleYaxis: true },
            },
        dataLabels:
            {
                enabled: false,
            },
        xaxis:
            {
                type: "datetime",
                tickAmount: 6,
            },
        colors: ["#758AA2"],
        markers:
            {
                colors: ["#fff"],
                strokeColor: "#fff",
                size: 0,
                strokeWidth: 1,
                style: "hollow",
            },
        tooltip:
            {
                theme: "dark",
            },
        fill:
            {
                type: "gradient",
                gradient:
                    {
                        shadeIntensity: 2,
                        opacityFrom: 0.6,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
            },
        grid:
            {
                borderColor: "#47535E",
                strokeDashArray: 4,
                show: true,
            },
    };

    const handleLabelChange = (value) =>
    {
        setActiveLabel(value);
    }

    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getMarketChart({ coinId, days: activeLabel }));
    }, [coinId, activeLabel]);

    return (
        <div>
            <div className="space-x-3">
                {timeSeries.map(item => (
                    <Button
                        key={item.label}
                        className="rounded-full"
                        variant={activeLabel === item.label ? "" : "outline"}
                        onClick={() => handleLabelChange(item.value)}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div id="chart-timelines">
                <Chart options={options} series={series} type="area" height={450}/>
            </div>
        </div>

    );
};

export default StockChart;
