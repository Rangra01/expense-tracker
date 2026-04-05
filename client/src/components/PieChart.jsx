import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6b6b"];

const CustomPieChart = ({ data }) => {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {chartData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CustomPieChart;