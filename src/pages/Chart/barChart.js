import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { getAllOrders } from '~/services/Orders/orderService';
import { toast } from 'react-toastify';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart = () => {
    const [chartData, setChartData] = useState([]);
    const [timeRange, setTimeRange] = useState('Date');

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await getAllOrders();
                if (response.code !== 200) {
                    throw new Error('Failed to fetch chart data');
                }

                const jsonData = response.data.content;
                const filteredData = jsonData.filter((order) => order.status === 'COMPLETE');
                console.log(filteredData);
                const processData = (data, format, unit, totalUnits, fixedLabels) => {
                    const latestOrderDate = data.reduce((latestDate, item) => {
                        const orderDate = dayjs(item.createdAt);
                        return orderDate.isAfter(latestDate) ? orderDate : latestDate;
                    }, dayjs('2000-01-01'));

                    const latestUnits =
                        fixedLabels ||
                        Array.from({ length: totalUnits }, (_, index) =>
                            latestOrderDate.subtract(index, unit).format(format),
                        ).reverse();

                    const revenueByTime = data.reduce((acc, item) => {
                        const time = dayjs(item.createdAt).format(format);
                        if (!acc[time]) {
                            acc[time] = { orderCount: 0, totalRevenue: 0 };
                        }
                        acc[time].orderCount += 1;
                        acc[time].totalRevenue += item.totalPrice;
                        return acc;
                    }, {});

                    const chartData = latestUnits.map((time) => {
                        const dailyData = revenueByTime[time];
                        return {
                            time,
                            orderCount: dailyData ? dailyData.orderCount : 0,
                            totalRevenue: dailyData ? dailyData.totalRevenue : 0,
                        };
                    });

                    return chartData;
                };

                let chartData;
                if (timeRange === 'Date') {
                    chartData = processData(filteredData, 'YYYY-MM-DD', 'day', 7);
                } else if (timeRange === 'Month') {
                    const currentYear = dayjs().year();
                    const months = Array.from({ length: 12 }, (_, index) =>
                        dayjs(new Date(currentYear, index)).format('YYYY-MM'),
                    );
                    chartData = processData(filteredData, 'YYYY-MM', 'month', 12, months);
                } else if (timeRange === 'Year') {
                    chartData = processData(filteredData, 'YYYY', 'year', 7);
                }
                console.log('Processed Chart Data:', chartData);

                setChartData(chartData);
            } catch (error) {
                toast.error('Failed to fetch chart data');
            }
        };

        fetchChartData();
    }, [timeRange]);

    if (!chartData || chartData.length === 0) {
        return <div>Loading...</div>;
    }

    const labels = chartData.map((data) => data.time);
    const orderCount = chartData.map((data) => data.orderCount);
    const totalRevenue = chartData.map((data) => data.totalRevenue);

    const data = {
        labels,
        datasets: [
            {
                label: 'Order Count',
                data: orderCount,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y',
            },
            {
                label: 'Revenue',
                data: totalRevenue,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                position: 'left',
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: ${value}`;
                    },
                    afterLabel: function (context) {
                        if (context.dataset.label === 'Revenue') {
                            return `$`;
                        }
                        return '';
                    },
                },
            },
            legend: {
                labels: {
                    fontSize: 25,
                },
            },
        },
    };

    return (
        <div className="section-body">
            <div className="row mt-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Order Count and Revenue</h4>
                        </div>
                        <div className="card-body">
                            <div>
                                <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                                    <option value="Date">Date</option>
                                    <option value="Month">Month</option>
                                    <option value="Year">Year</option>
                                </select>
                            </div>
                            <div>
                                <Bar data={data} height={400} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
