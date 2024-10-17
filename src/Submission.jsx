import {useState} from 'react'
export default function Submission({onSave}) {
    const [formInput,setFormInput]=useState({
        id: crypto.randomUUID(),
        category:"",
        amount:"",
        date:""
    })
    const [formType, setFormType] = useState("expense")
    function handleFormChange(formType){
        setFormType(formType)
    }

    function handleInputChange(e){
        const name = e.target.name;
        let value = e.target.value;
        setFormInput(
            {
                ...formInput,
                [name]:value,
            }
        )

    }
    function handleSave(e){
        e.preventDefault();
        onSave({...formInput,formType})
        setFormInput({
            id: crypto.randomUUID(),  // Ensure you get a new ID for each submission
            category: "",
            amount: "",
            date: ""
        });
        

    }


  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div onClick={()=>handleFormChange("expense")} className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 
            ${formType ==="expense"?"bg-blue-500 text-white"
                : "text-slate-700" }`}>
            Expense
          </div>
          <div onClick={()=>handleFormChange("income")} className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 
            ${formType ==="income"?"bg-blue-500 text-white"
                : "text-slate-700" }`}>
            Income
          </div>
        </div>

        {/* <!-- Note -->
            <!-- Income Categories - Salary, Outsourcing, Bond, Dividend --> */}
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            {formType === "expense"?<select
              id="category"
              name="category"
              value={formInput.category}
              onChange={handleInputChange}
              autoComplete="category-name"
              className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option>Education</option>
              <option>Food</option>
              <option>Health</option>
              <option>Bill</option>
              <option>Insurance</option>
              <option>Tax</option>
              <option>Transport</option>
              <option>Telephone</option>
            </select>:<select
              id="category"
              name="category"
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option>Salary</option>
              <option>Outsourcing</option>
              <option>Bond</option>
              <option>Dividend</option>
              
            </select>}
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              value={formInput.amount}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              value={formInput.date}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
            onClick={handleSave}
            type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          Save
        </button>
      </form>
    </div>
  );
}
