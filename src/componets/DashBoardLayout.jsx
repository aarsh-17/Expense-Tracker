import { Link, Outlet, useLocation } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext.jsx";
import { useEffect } from "react";
import { LogOutIcon } from "lucide-react";

const DashboardLayout = () => {
  const { expenses, setExpenses } = useExpense();
  const location = useLocation();

  // Store expenses to localStorage on update
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
     
      {/* Sidebar (fixed width, full height) */}
      <aside className="w-full bg-white shadow-md p-9 flex flex-row justify-between h-[80px] items-center ">
        <h2 className="text-2xl font-bold text-blue-700 ">Expense Tracker</h2>
        <div className="flex flex-row justify-center items-center gap-[40px]">
           <Link
          to=""
          className={`mb-2 p-2 rounded ${
            location.pathname === "/dashboard"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100 text-blue-700"
          }`}
        >
          🏠 
        </Link>
        <Link
          to="add"
          className={`mb-2 p-2 rounded ${
            location.pathname === "/dashboard/add"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100 text-blue-700"
          }`}
        >
          ➕ 
        </Link>
        <Link
          to="filter"
          className={`mb-2 p-2 rounded ${
            location.pathname === "/dashboard/filter"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100 text-blue-700"
          }`}
        >
          🔍 
        </Link>
        <Link
          to="charts"
          className={`mb-2 p-2 rounded ${
            location.pathname === "/dashboard/charts"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-100 text-blue-700"
          }`}
        >
          📊 
        </Link>
        
        </div>
       <div ><button onClick={()=>{localStorage.removeItem("authToken"); window.location.reload()}}><LogOutIcon /></button></div>
      </aside>

       

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        

        {/* White Card Wrapper */}
        <div className="bg-white rounded-3xl shadow-xl p-6  w-full min-h-[700px]">
          <Outlet />
        </div>

        {/* Total */}
        
      </main>
    </div>
  );
};

export default DashboardLayout;
