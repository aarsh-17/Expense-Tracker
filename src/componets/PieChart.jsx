import { PieChart, Pie, Cell, ResponsiveContainer,Legend } from 'recharts';
import { useExpense } from '../context/ExpenseContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartWithLabel = () => {

  const { expenses } = useExpense();
  
    const data = Object.values(
    
    expenses.reduce((acc, { category, amount }) => {
      const numericAmount = parseFloat(amount);
      acc[category] = acc[category] || { name: category, value: 0 };
      acc[category].value += numericAmount;
      return acc;
    }, {})
  );
  console.log(data);  
  return (
    <>
    <ResponsiveContainer width={400} height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <div className='bg-black'>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </div>
       
      </PieChart>
    </ResponsiveContainer>
    </>
    
  );
};

export default PieChartWithLabel;

