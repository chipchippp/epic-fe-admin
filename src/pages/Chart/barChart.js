import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { getAllOrders } from '~/services/Orders/orderService';
import { toast, ToastContainer } from 'react-toastify';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const BarChart = () => {
    const [chartData, setChartData] = useState([]);
    const [timeRange, setTimeRange] = useState('Date');

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await getAllOrders();
                if (response.code !== 200) throw new Error('Failed to fetch chart data');

                const orders = response.data.content;
                const completeOrders = orders.filter((order) => order.status === 'COMPLETE');
                const currentYear = dayjs().year();

                const currentYearOrders = completeOrders.filter(
                    (order) => dayjs(order.createdAt, 'DD-MM-YYYY HH:mm:ss').year() === currentYear,
                );

                const processData = (data, format, unit, totalUnits, fixedLabels) => {
                    const latestOrderDate = data.reduce(
                        (latestDate, order) => {
                            const orderDate = dayjs(order.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
                            return orderDate.isAfter(latestDate) ? orderDate : latestDate;
                        },
                        dayjs('2000-01-01', 'YYYY-MM-DD'),
                    );

                    const labels =
                        fixedLabels ||
                        Array.from({ length: totalUnits }, (_, index) =>
                            latestOrderDate.subtract(index, unit).format(format),
                        ).reverse();

                    const revenueByTime = data.reduce((acc, order) => {
                        const time = dayjs(order.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS').format(format);
                        if (!acc[time]) {
                            acc[time] = { orderCount: 0, totalRevenue: 0 };
                        }
                        acc[time].orderCount += 1;
                        acc[time].totalRevenue += parseFloat(order.totalPrice); // Chuyển đổi totalPrice thành số
                        return acc;
                    }, {});

                    return labels.map((time) => ({
                        time,
                        orderCount: revenueByTime[time]?.orderCount || 0,
                        totalRevenue: revenueByTime[time]?.totalRevenue || 0,
                    }));
                };

                let chartData;
                if (timeRange === 'Date') {
                    chartData = processData(currentYearOrders, 'DD-MM-YYYY', 'day', 7);
                } else if (timeRange === 'Month') {
                    const months = Array.from({ length: 12 }, (_, index) =>
                        dayjs(new Date(currentYear, index)).format('MMMM'),
                    );
                    chartData = processData(currentYearOrders, 'MMMM', 'month', 12, months);
                } else if (timeRange === 'Year') {
                    chartData = processData(completeOrders, 'YYYY', 'year', 7);
                }

                console.log('Chart Data:', chartData); // Kiểm tra dữ liệu của chartData

                setChartData(chartData);
            } catch (error) {
                toast.error('Failed to fetch chart data', error);
            }
        };

        fetchChartData();
    }, [timeRange]);

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
                ticks: {
                    callback: (value) => (Number.isInteger(value) ? value : ''),
                },
            },
            y1: {
                beginAtZero: true,
                position: 'right',
                grid: { display: false },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${context.raw}`,
                    afterLabel: (context) => (context.dataset.label === 'Revenue' ? ' $' : ''),
                },
            },
            legend: { labels: { fontSize: 12 } },
        },
    };

    if (!chartData.length) {
        return <div>Loading...</div>;
    }

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
            <ToastContainer />
        </div>
    );
};

export default BarChart;
