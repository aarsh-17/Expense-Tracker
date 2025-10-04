import { useExpense } from "../context/ExpenseContext"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, TrendingDown, TrendingUp, Calendar, DollarSign, ShoppingBag, Coffee, Car, Home, Gamepad2, Heart, MoreHorizontal, Trash2, Edit3, PieChart, BarChart3, Filter } from 'lucide-react';
const Recents = () => {
  const exportToCSV = () => {
  const headers = ["Title", "Amount", "Category", "Date"];
  const rows = expenses.map((exp) => [exp.title, exp.amount, exp.category, exp.date]);
  
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "expenses.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};
  
  const { expenses,income } = useExpense();
  const totalExpense=Number(expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2));
            console.log(totalExpense);
            
  const totalIncome=income
            .reduce((total, income) => total + parseFloat(income.amount || 0), 0)
            .toFixed(2)
            
  const balance=totalIncome-totalExpense
  const recentExpenses = [...expenses]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);
  return(
    <div className="mt-6 w-full flex flex-col">
      {recentExpenses.length!==0 &&(
        <div className="flex justify-end gap-5"> 
          <button
            onClick={exportToCSV}
            className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-[120px]"
          >
            Export CSV
          </button>
        
      </div>
)}

  <div className="space-y-4">
              <div className={`${balance >= 0 ? 'bg-emerald-700' : 'bg-rose-700'} backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/50 `}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white text-sm font-medium">Current Balance</span>
                  <div className={`p-3 rounded-2xl ${balance >= 0 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                    {balance >= 0 ? 
                      <TrendingUp className="w-6 h-6 text-emerald-600" /> : 
                      <TrendingDown className="w-6 h-6 text-rose-600" />
                    }
                  </div>
                </div>
                <p className={`text-3xl font-bold text-white`}>
                  ₹{balance}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-emerald-100">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-slate-600 font-medium">Income</span>
                  </div>
                  <p className="text-2xl font-semibold text-emerald-600">
                    ₹{totalIncome}
                  </p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-rose-100">
                      <TrendingDown className="w-5 h-5 text-rose-600" />
                    </div>
                    <span className="text-slate-600 font-medium">Expenses</span>
                  </div>
                  <p className="text-2xl font-semibold text-rose-600">
                    ₹{totalExpense}
                  </p>
                </div>
              </div>
            </div>


  <h2 className="text-xl font-semibold text-blue-700 mb-2">🕒 Recent Expenses</h2>
  {recentExpenses.length === 0 ? (
    <p className="text-gray-500">No recent expenses.</p>
  ) : (
    
    <ul className="space-y-2">
      {recentExpenses.map((exp, i) => (
        <li
          key={i}
          className="flex justify-between bg-blue-100 p-3 rounded shadow-sm text-sm"
        >
          <span>{exp.title}</span>
          <span>₹{exp.amount} • {exp.category} • {exp.date}</span>
        </li>
      ))}
    </ul>
  )}
  <div className="mt-6 w-full h-64">
  <h2 className="text-xl font-semibold text-blueS-700 mb-2">📊 Last 5 Expenses Chart</h2>
  {recentExpenses.length === 0 ? (
    <p className="text-gray-500">No data to visualize.</p>
  ) : (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={recentExpenses.reverse()}>
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#2563EB" />
      </BarChart>
    </ResponsiveContainer>
  )}
</div>
</div>
  )
}

export default Recents