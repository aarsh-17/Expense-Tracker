import { BarChart, LineChart, PieChart } from "lucide-react";
import { useState } from "react";
import PieChartWithLabel from "./PieChart.jsx";
import MonthlyLineChart from "./LineChart.jsx";
import { useExpense } from "../context/ExpenseContext.jsx";
 import Papa from "papaparse";




const Charts=()=>{
    const { setExpenses } = useExpense();
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedExpenses = results.data.map((row) => ({
          title: row.title,
          amount: parseFloat(row.amount).toFixed(2),
          category: row.category,
          date: row.date,
        }));

        // Update global expenses state
        setExpenses(parsedExpenses);
      },
    });
  };

  const { expenses } = useExpense();
  console.log(expenses);
 
  
  return (
    <>
    <div className="flex flex-row justify-center items-center gap-9 ">
  
        
         <MonthlyLineChart expenses={expenses} />
         <PieChartWithLabel  size={45}/>
         
    </div>
    <div className="p-4 flex items-center gap-3 mt-6">
  <span className="text-lg font-semibold">Need an example?</span>
  <a
    href="/demo_expenses.csv"
    download
    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
  >
    Download Demo CSV
  </a>
</div>

       <div>
      <div className="p-4 flex items-center gap-4">
      <label className="font-semibold">📥 Import Expenses CSV:</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="bg-white p-2 border rounded"
      />
    </div>
     </div>
     </>
       

    
       
    
    
 
  )
}


export default Charts