import { useState, useEffect } from "react";
import { useExpense } from "../context/ExpenseContext";

const Form = ({ type }) => {
  const {
    income,
    setIncome,
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
    setError,
    error,
    resetForm,
    categories,
    setExpenses,
    expenses,
  } = useExpense();

  useEffect(() => {
    resetForm();
  }, [type]);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
  }, [income]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !amount ||
      !date ||
      (type === "expense" && (!title || !category)) ||
      (type === "income" && !title)
    ) {
      setError("All fields are required");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    const formatted = {
      title,
      amount: parseFloat(amount).toFixed(2),
      date,
    };

    if (type === "expense") {
      const newExpense = { ...formatted, category };

      if (editIndex !== null) {
        const updated = [...expenses];
        updated[editIndex] = newExpense;
        setExpenses(updated);
      } else {
        setExpenses([...expenses, newExpense]);
      }
    } else {
      const newIncome = { ...formatted, source: title };

      if (editIndex !== null) {
        const updated = [...income];
        updated[editIndex] = newIncome;
        setIncome(updated);
      } else {
        setIncome([...income, newIncome]);
      }
    }

    resetForm();
  };

  return (
    <div className="p-3 flex flex-col justify-between">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        {editIndex !== null
          ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`
          : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={type === "income" ? "Source" : "Title"}
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {type === "expense" && (
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        )}

        <input
          type="date"
          className="w-full p-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
