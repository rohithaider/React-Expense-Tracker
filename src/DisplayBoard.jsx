import Expense from "./Income";
import Income from "./Exepnse";
import Submission from "./Submission";
import TotalBalance from "./TotalBalance";

export default function DisplayBoard() {
  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Submission/>
    
        <div className="lg:col-span-2">
          <TotalBalance/>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Expense/>
            <Income/>
            
          </div>
        </div>
      </section>
    </main>
  );
}
