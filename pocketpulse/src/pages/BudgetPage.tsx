import BudgetGoalForm from "../components/BudgetGoalForm"
import BudgetGoalList from "../components/BudgetGoalList"
import {
  pageSubtitleClass,
  pageTitleClass,
} from "../components/formStyles"

export default function BudgetPage() {
  return (
    <div className="w-full space-y-10 lg:space-y-12">
      <section>
        <h2 className={pageTitleClass}>Set a budget</h2>
        <p className={pageSubtitleClass}>
          Choose a category and set a monthly spending limit.
        </p>

        <div className="mt-6 lg:mt-8">
          <BudgetGoalForm />
        </div>
      </section>

      <section>
        <h2 className={pageTitleClass}>Your budgets</h2>
        <p className={pageSubtitleClass}>
          Track how much you have spent and what is left this month.
        </p>

        <div className="mt-6 lg:mt-8">
          <BudgetGoalList />
        </div>
      </section>
    </div>
  )
}
