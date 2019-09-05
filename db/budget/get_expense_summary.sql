select category, sum(amount) from expense_category
left JOIN user_expense ON user_expense.category_id = expense_category.id
where user_id = $1 and calendar = $2 or user_expense.id is null group by category 