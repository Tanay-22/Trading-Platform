import Chart from 'react-apexcharts';
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";


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

const StockChart = () =>
{
    const [activeLabel, setActiveLabel] = useState("1 Day");

    const data =
    [
        [1723306615050, 5088862.405098159],
        [1723309533728, 5094122.045428964],
        [1723313875172, 5137558.849433624],
        [1723317526768, 5114254.281544502],
        [1723320271656, 5123311.16233443],
        [1723324101051, 5122370.01021176],
        [1723327907455, 5122256.515266408],
        [1723330864241, 5114652.213490168],
        [1723334997494, 5122119.662243926],
        [1723338307559, 5129634.122027012],
        [1723341868265, 5132921.527801102],
        [1723345486692, 5122973.662205712],
        [1723349218827, 5129607.024897517],
        [1723352814538, 5118345.367896513],
        [1723356553665, 5125908.023914318],
        [1723360182597, 5133081.470536109],
        [1723363790073, 5144615.605483051],
        [1723367025635, 5144035.528649892],
        [1723371100467, 5137883.122044234],
        [1723374050172, 5131082.7268926],
        [1723377700760, 5096666.463837126],
        [1723382141545, 5063564.027436231],
        [1723385613903, 5067854.004760804],
        [1723388687804, 5065183.237577569],
        [1723393090017, 5040371.696183227],
        [1723395619476, 5052496.4618531],
        [1723399850643, 5056100.209345625],
        [1723404070667, 5044009.111962311],
        [1723407524657, 4947812.532405265],
        [1723410805910, 4900421.471965131],
        [1723414670841, 4933846.155948836],
        [1723418018331, 4940133.436664902],
        [1723420826166, 4936618.485284759],
        [1723425412875, 4921520.215042031],
        [1723429075963, 4919496.81953746],
        [1723432438571, 4915751.73910924],
        [1723436203302, 4905395.191953243],
        [1723439692093, 4920029.857026321],
        [1723443221985, 4906319.997435625],
    ];

    const series =
    [
        {
            name: "Stock Price",
            data: data,
        },
    ];

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

    return (
        <div>
            <div className="space-x-3">
                {timeSeries.map(item => (
                    <Button
                        key={item.label}
                        className="rounded-full"
                        variant={activeLabel === item.label ? "" : "outline"}
                        onClick={() => handleLabelChange(item.label)}
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
