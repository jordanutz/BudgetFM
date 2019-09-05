select category, sum(amount) from income_category
left JOIN user_income ON user_income.category_id = income_category.id
where user_id = $1 and calendar = $2 or user_income.id is null group by category 