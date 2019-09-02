SELECT user_expense.id AS expense, date_posted, description, amount, calendar, category, icon FROM user_expense
INNER JOIN expense_category ON user_expense.category_id = expense_category.id
WHERE user_id = $1 AND calendar = $2