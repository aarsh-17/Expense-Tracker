import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Form from "./Form.jsx";
import ExpenseList from "./ExpenseList.jsx";
import Charts from "./Charts.jsx";
import { useExpense } from "../context/ExpenseContext.jsx";
import FilterComponent from "./FilterComponent.jsx";

const Dashboard = () => {
  const { expenses } = useExpense();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-purple-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6">Expense Tracker</h1>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-7xl p-4 grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <aside className="col-span-3 bg-gray-50 rounded-2xl p-4 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-purple-700 mb-2">Menu</h2>

          <Link
            to="/dashboard/add"
            className={`p-2 rounded ${
              location.pathname === "/dashboard/add"
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-100 text-purple-700"
            }`}
          >
            ➕ Add Expense
          </Link>

          <Link
            to="/dashboard/filter"
            className={`p-2 rounded ${
              location.pathname === "/dashboard/filter"
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-100 text-purple-700"
            }`}
          >
            🔍 Filter Expense
          </Link>

          <Link
            to="/dashboard/charts"
            className={`p-2 rounded ${
              location.pathname === "/dashboard/charts"
                ? "bg-purple-600 text-white"
                : "hover:bg-purple-100 text-purple-700"
            }`}
          >
            📊 Charts
          </Link>
        </aside>

        {/* Main content */}
        <main className="col-span-9 p-2">
          <Routes>
            <Route
              path="/add"
              element={
                <>
                  <Form />
                  <ExpenseList />
                </>
              }
            />
            <Route path="/filter" element={<FilterComponent />} />
            <Route path="/charts" element={<Charts expenses={expenses} />} />
          </Routes>
        </main>
      </div>

      <p className="text-2xl font-bold text-red-500 mt-4">
        Total Expense: ₹
        {expenses
          .reduce((total, expense) => total + parseFloat(expense.amount || 0), 0)
          .toFixed(2)}
      </p>
    </div>
  );
};

export default Dashboard;
