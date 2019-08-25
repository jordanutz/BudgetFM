SELECT user_expense.id AS expense, date_posted, description, amount, calendar, type, icon FROM user_expense
INNER JOIN expense_category ON user_income.category_id = income_category.id
WHERE user_id = $1 AND calendar = $2