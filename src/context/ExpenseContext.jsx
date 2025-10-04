// src/context/ExpenseContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { Plus, TrendingDown, TrendingUp, Calendar, DollarSign, ShoppingBag, Coffee, Car, Home, Gamepad2, Heart, MoreHorizontal, Trash2, Edit3, PieChart, BarChart3, Filter } from 'lucide-react';

const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem("expenses");
    return stored ? JSON.parse(stored) : [];
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [income,setIncome] = useState(() => {
    const stored = localStorage.getItem("income");
    return stored ? JSON.parse(stored) : [];
  });

  // Load from localStorage

   const categories = [
    { icon: Coffee, color: 'bg-rose-100 text-rose-600', name: 'Food' },
   { icon: Car, color: 'bg-blue-100 text-blue-600', name: 'Transport' },
    { icon: Home, color: 'bg-green-100 text-green-600', name: 'Home & Utilities' },
    { icon: ShoppingBag, color: 'bg-purple-100 text-purple-600', name: 'Shopping' },
    { icon: Gamepad2, color: 'bg-orange-100 text-orange-600', name: 'Entertainment' },
   { icon: Heart, color: 'bg-pink-100 text-pink-600', name: 'Health & Wellness' },
   { icon: MoreHorizontal, color: 'bg-gray-100 text-gray-600', name: 'Other' }
   ];
  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory(categories[0]);
    setDate("");
    setEditIndex(null);
    setError("");
  };

  return (
    <ExpenseContext.Provider
      value={{
        income,
        setIncome,
        expenses,
        setExpenses,
        title,
        setTitle,
        amount,
        setAmount,
        category,
        setCategory,
        date,
        setDate,
        editIndex,
        setEditIndex,
        error,
        setError,
        resetForm,
        categories
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
