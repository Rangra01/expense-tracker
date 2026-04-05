import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CustomBarChart = ({ data }) => {
  return (
    <BarChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="total" fill="#8884d8" />
    </BarChart>
  );
};

export default CustomBarChart;