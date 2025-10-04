
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend} from "recharts";
import dayjs from "dayjs";

const getMonthlyExpenseData = (expenses) => {
  const monthlyTotals = {};

  expenses.forEach(({ date, amount }) => {
    const key = dayjs(date).format("MMM YYYY"); // e.g. "Jun 2025"
    const numericAmount = parseFloat(amount);
    monthlyTotals[key] = (monthlyTotals[key] || 0) + numericAmount;
  });
  console.log(monthlyTotals);

  return Object.entries(monthlyTotals)
    .map(([month, expense]) => ({ month, expense }))
    .sort((a, b) => dayjs(a.month, "MMM YYYY") - dayjs(b.month, "MMM YYYY"));
    
};



const MonthlyLineChart = ({ expenses }) => {
  const data = getMonthlyExpenseData(expenses);

  return (
    <ResponsiveContainer width={500} height={300}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="expense"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyLineChart;
