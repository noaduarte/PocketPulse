import { useState } from "react"

import {
  isProtectedCategory,
  OTHER_CATEGORY,
} from "../data/categories"
import { useCategoryStore } from "../store/categoryStore"

import {
  cardClass,
  dangerButtonClass,
  inputClass,
  primaryButtonClass,
} from "./formStyles"

export default function CategorySettings() {
  const categories = useCategoryStore((state) => state.categories)
  const addCategory = useCategoryStore((state) => state.addCategory)
  const deleteCategory = useCategoryStore(
    (state) => state.deleteCategory
  )

  const [newCategory, setNewCategory] = useState("")
  const [error, setError] = useState("")

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")

    const added = addCategory(newCategory)

    if (!added) {
      setError(
        "Enter a unique category name (Other is reserved)."
      )
      return
    }

    setNewCategory("")
  }

  const handleDelete = (name: string) => {
    deleteCategory(name)
  }

  return (
    <div className={`space-y-5 ${cardClass}`}>
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
          Categories
        </h3>
        <p className="mt-1 text-base text-slate-500 dark:text-slate-400 sm:text-lg">
          Deleting a category automatically reassigns its
          transactions to {OTHER_CATEGORY}.
        </p>
      </div>

      <form
        onSubmit={handleAdd}
        className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label htmlFor="new-category" className="sr-only">
            New category
          </label>
          <input
            id="new-category"
            type="text"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value)
              setError("")
            }}
            placeholder="New category name"
            className={inputClass}
          />
        </div>
        <button type="submit" className={primaryButtonClass}>
          Add
        </button>
      </form>

      {error && (
        <p className="text-base text-rose-600 dark:text-rose-400 sm:text-lg">
          {error}
        </p>
      )}

      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category}
            className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-900/40"
          >
            <span className="min-w-0 break-words text-base font-medium text-slate-800 dark:text-slate-100 sm:text-lg">
              {category}
              {isProtectedCategory(category) && (
                <span className="ml-2 text-sm font-normal text-slate-400 dark:text-slate-500">
                  (default fallback)
                </span>
              )}
            </span>

            {!isProtectedCategory(category) && (
              <button
                type="button"
                onClick={() => handleDelete(category)}
                className={`shrink-0 ${dangerButtonClass}`}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
