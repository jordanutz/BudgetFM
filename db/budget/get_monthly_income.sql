select user_income.id as income, date_posted, description, amount, calendar, type, icon from user_income 
inner join income_categories on user_income.category_id = income_categories.id
where user_id = $1 and calendar = $2