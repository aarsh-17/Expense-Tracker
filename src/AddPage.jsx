import Form from "./componets/Form.jsx";
import ExpenseList from "./componets/ExpenseList.jsx";
import { useState } from "react";
const AddPage = () => {
   const [type, setType] = useState("expense"); // 'expense' or 'income'
  return(
  <div className="h-full">
    <div className="space-y-3 mb-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-3 bg-white border border-gray-300 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      
    <Form type={type}/>
    <ExpenseList type={type}/>
    
  </div>
);
}

export default AddPage;