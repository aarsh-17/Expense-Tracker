import { useExpense } from "../context/ExpenseContext";
import { useState } from "react";
import { Plus, TrendingDown, TrendingUp, Calendar, DollarSign, ShoppingBag, Coffee, Car, Home, Gamepad2, Heart, MoreHorizontal, Trash2, Edit3, PieChart, BarChart3, Filter } from 'lucide-react';

const FilterComponent = () => {
  const { expenses, categories } = useExpense();
  const [filterType, setFilterType] = useState("date"); // 'category' or 'date'
  const [filterValue, setFilterValue] = useState("");
  const [searchText, setSearchText] = useState("");

  


  // Filter logic
  const filteredExpenses = expenses.filter((exp) => {

    const matchesFilter =
      !filterValue ||
      (filterType === "category" && exp.category === filterValue) ||
      (filterType === "date" && exp.date === filterValue);

    const matchesSearch = exp.title.toLowerCase().includes(searchText.toLowerCase());
    
    
    return matchesFilter && matchesSearch;
  });

  console.log(filteredExpenses);
  

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full h-full ">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">
        Filter & Search Your Expenses
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">Filter by:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue("");
            }}
            className="border p-2 rounded"
          >
            <option value="category">Category</option>
            <option value="date">Date</option>
          </select>

          {filterType === "category" ? (
           <select
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          ) : (
            <input
              type="date"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border p-2 rounded"
            />
          )}
        </div>

        {/* Title Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Filtered List */}
      {filteredExpenses.length === 0 ? (
                <p className="text-gray-500">No matching expenses found.</p>
              ) : (
                <ul className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {filteredExpenses.map((exp, i) => {
                  const cat = categories.find(c => c.name === exp.category); 
                  const Icon = cat?.icon;

          return (
            <li
              key={i}
              className="bg-blue-100 p-3 rounded shadow-sm flex justify-start"
            > 
            {Icon && <Icon className={`w-14 h-14 ${cat.color} rounded-xl mr-4 border-2`} />} 
              <div>
                <p className=" text-m font-semibold">{exp.title}</p>
                <p className="text-m text-gray-600 flex items-center gap-2">
                  ₹{exp.amount} • 
                 
                  {exp.category} • 
                  {exp.date}
                </p>
              </div>
            </li>
          );
        })}

        </ul>
      )}
    </div>
  );
};

export default FilterComponent;
