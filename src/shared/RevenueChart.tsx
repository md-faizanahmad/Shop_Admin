// components/RevenueChart.tsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format, startOfMonth, eachDayOfInterval } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueChart({
  monthlyData,
}: {
  monthlyData: number[];
}) {
  const days = eachDayOfInterval({
    start: startOfMonth(new Date()),
    end: new Date(),
  });

  const data = {
    labels: days.map((d) => format(d, "d")),
    datasets: [
      {
        label: "Revenue (₹)",
        data: monthlyData,
        backgroundColor: "rgba(34, 197, 94, 0.7)", // green-500
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Revenue This Month", font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { callback: (v: unknown) => `₹${v}` } },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 h-80">
      <Bar data={data} options={options} />
    </div>
  );
}
