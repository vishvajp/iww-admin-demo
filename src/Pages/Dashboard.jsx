import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from "chart.js";
import "../css/Dashboard.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);
const Dashboard = () => {
  const LineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 30, 40, 50],
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  const pieData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#9966ff",
        ],
        hoverBackgroundColor: [
          "#ff4569",
          "#2b92d1",
          "#ffb84d",
          "#3e8e41",
          "#7a4fc2",
        ],
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [500, 700, 800, 600, 900, 1100],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#9966ff', '#ff9800'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      Dashboard
      <div className="d-flex">
        <div className="dashboard-line-chart">
          <Line data={LineData} />
        </div>
        <div className="dashboard-pie-chart">
          <Pie data={pieData} />
        </div>

        <div className="dashboard-bar-chart">
        <Bar data={barData}  />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
