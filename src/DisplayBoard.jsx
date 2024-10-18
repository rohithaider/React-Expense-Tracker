import { useState } from "react";
import Expense from "./Expense";
import Income from "./Income";
import Submission from "./Submission";
import TotalBalance from "./TotalBalance";
export default function DisplayBoard() {
  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expense: 0,
    formType: "expense",
  });
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [formInput, setFormInput] = useState({
    id: crypto.randomUUID(),
    category: "",
    amount: "",
    date: "",
  });
  const [formType, setFormType] = useState("expense");

  
  function handleOnSave(formData) {
    let newBalance = data.balance;
  
    if (formData.formType === "expense") {
      const expense = parseInt(formData.amount);
      const isEdit = expenseList.some((item) => item.id === formData.id);
      let existingItem;
  
      if (isEdit) {
        existingItem = expenseList.find((item) => item.id === formData.id);
        newBalance += existingItem.expense; 
        newBalance -= expense; 
      } else {
        newBalance -= expense;
      }
  
      setData((data) => ({
        ...data,
        ...formData,
        balance: newBalance,
        expense: isEdit
          ? data.expense - existingItem.expense + expense
          : data.expense + expense,
        formType: formData.formType,
      }));
  
      setExpenseList((prevList) =>
        isEdit
          ? prevList.map((item) =>
              item.id === formData.id
                ? { ...item, category: formData.category, date: formData.date, expense }
                : item
            )
          : [...prevList, { expense, category: formData.category, date: formData.date, id: formData.id }]
      );
    } else {
      const income = parseInt(formData.amount);
      const isEdit = incomeList.some((item) => item.id === formData.id);
      let existingItem;
  
      if (isEdit) {
        existingItem = incomeList.find((item) => item.id === formData.id);
        newBalance -= existingItem.income; 
        newBalance += income; 
      } else {
        newBalance += income;
      }
  
      setData((data) => ({
        ...data,
        ...formData,
        balance: newBalance,
        income: isEdit
          ? data.income - existingItem.income + income
          : data.income + income,
        formType: formData.formType,
      }));
  
      setIncomeList((prevList) =>
        isEdit
          ? prevList.map((item) =>
              item.id === formData.id
                ? { ...item, category: formData.category, date: formData.date, income }
                : item
            )
          : [...prevList, { income, category: formData.category, date: formData.date, id: formData.id }]
      );
    }
  }
  
  

  function handleShowSortIncome(income) {
    setIncomeList(income);
  }
  function handleShowSortExpense(expense) {
    setExpenseList(expense);
  }

  function handleIncomeDelete(incomingList) {
    const newIncomeList = [...incomeList];
    const newIncome = incomingList.income;
    const balance = data.balance;
    const income = data.income;
    let updatedBalance = balance - newIncome;
    let updatedIncome = income - newIncome;

    const updatedList = newIncomeList.filter(
      (income) => income.id !== incomingList.id
    );
    setIncomeList(updatedList);

    setData((data) => ({
      ...data,
      balance: updatedBalance,
      income: updatedIncome,
    }));
  }

  function handleExpenseDelete(incomingExpense) {
    console.log(incomingExpense);
    const newExpenseList = [...expenseList];
    const newExpense = incomingExpense.expense;
    const balance = data.balance;
    const expense = data.expense;

    let updatedBalance = balance + newExpense;
    let updatedExpense = expense - newExpense;

    console.log(updatedBalance, updatedExpense);

    const updatedList = newExpenseList.filter(
      (expense) => expense.id !== incomingExpense.id
    );

    setExpenseList(updatedList);

    setData((data) => ({
      ...data,
      balance: updatedBalance,
      expense: updatedExpense,
    }));
  }

  function handleIncomeEdit(incomingIncome) {
    setFormInput({
      id: incomingIncome.id,
      date: incomingIncome.date,
      category: incomingIncome.category,
      amount: incomingIncome.income,
    });
    setFormType("income");
  }

  function handleExpenseEdit(incomingExpense) {
    setFormInput({
      id: incomingExpense.id,
      date: incomingExpense.date,
      category: incomingExpense.category,
      amount: incomingExpense.income,
    });
    setFormType("expense");
  }

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Submission
          onSave={handleOnSave}
          formInput={formInput}
          setFormInput={setFormInput}
          formType={formType}
          setFormType={setFormType}
        />

        <div className="lg:col-span-2">
          <TotalBalance data={data} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income
              incomeData={incomeList}
              showSortIncome={handleShowSortIncome}
              onDelete={handleIncomeDelete}
              onEdit={handleIncomeEdit}
              setIncome={setIncomeList}
            />
            <Expense
              expenseData={expenseList}
              showSortExpense={handleShowSortExpense}
              onDelete={handleExpenseDelete}
              onEdit={handleExpenseEdit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
