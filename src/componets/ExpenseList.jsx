import { useExpense } from "../context/ExpenseContext";

const ExpenseList = ({ type }) => {
  const {
    setTitle,
    setAmount,
    setCategory,
    setDate,
    setEditIndex,
    setError,
    resetForm,
    setExpenses,
    setIncome,
    expenses,
    income,
    categories,
  } = useExpense();

  const isExpense = type === "expense";
  const data = isExpense ? expenses : income;

  const handleEdit = (index) => {
    const item = data[index];
    setTitle(item.title || item.source);
    setAmount(item.amount);
    setDate(item.date);
    setEditIndex(index);
    setError("");
    if (isExpense) {
      setCategory(item.category);
    }
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    if (updated.length === 0) {
      localStorage.removeItem(isExpense ? "expenses" : "income");
    }

    if (isExpense) {
      setExpenses(updated);
    } else {
      setIncome(updated);
    }

    resetForm();
  };

  return (
    <div className="mt-6 ml-[50px]">
      <h3 className="text-lg font-semibold mb-2">
        Your {isExpense ? "Expenses" : "Income"}
      </h3>
      <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {data.map((item, i) => {
          const categoryObj = isExpense
            ? categories.find((c) => c.name === item.category)
            : null;
          const Icon = categoryObj?.icon;

          return (
            <li
              key={i}
              className="group flex justify-between items-center bg-gray-100 p-3 rounded"
            >
              <div className="flex items-center">
                {isExpense && Icon && (
                  <Icon
                    className={`w-14 h-14 ${categoryObj.color} rounded-xl mr-4 border-2`}
                  />
                )}
                <div>
                  <p className="font-medium">{item.title || item.source}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    ₹{item.amount} •{" "}
                    {isExpense ? `${categoryObj?.name} • ` : ""}
                    {item.date}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-sm bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded"
                  onClick={() => handleEdit(i)}
                >
                  Edit
                </button>
                <button
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;
