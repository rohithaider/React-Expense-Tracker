import {useState} from 'react'
import Expense from "./Expense";
import Income from "./Income";
import Submission from "./Submission";
import TotalBalance from "./TotalBalance";
import {useEffect} from 'react'
export default function DisplayBoard() {
    const [data,setData] = useState({'balance':0,'income':0,'expense':0,'formType':"expense"})
    const [incomeList, setIncomeList]=useState([])
    const [expenseList, setExpenseList]=useState([])
    
    function handleOnSave(formData){
        let newBalance = data.balance;
        

        
        if(formData.formType==='expense'){
            const expense = parseInt(formData.amount)
            newBalance -=expense;
            
            
            setData(data => ({
                ...data,
                ...formData, 
                balance: newBalance,
                expense:data.expense+expense,
                formType: formData.formType
            }));

            setExpenseList(prevList=>[...prevList,{
                expense: expense,
                category: formData.category,
                date:formData.date,
                id:formData.id
            }])

        }
        else{
            const income = parseInt(formData.amount)
            newBalance +=income;
            
            setData(data => ({
                ...data,
                ...formData, 
                balance: newBalance,
                income:data.income+income,
                formType: formData.formType
            }));

            setIncomeList(prevList=>[...prevList,{
                income: income,
                category: formData.category,
                date:formData.date,
                id:formData.id
            }])
            
        }
        
        
        
    }
    
     useEffect(() => {
        // console.log(incomeList)
         // Logs the data after the state has been updated
    }, [incomeList]); 



    function handleShowSortIncome(income){
      setIncomeList(income)
    }
    function handleShowSortExpense(expense){
      setExpenseList(expense)
    }

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Submission onSave = {handleOnSave}/>
    
        <div className="lg:col-span-2">
          <TotalBalance data={data}/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income incomeData={incomeList} showSortIncome={handleShowSortIncome}/>
            <Expense expenseData={expenseList} showSortExpense={handleShowSortExpense}/>
          </div>
        </div>
      </section>
    </main>
  );
}
