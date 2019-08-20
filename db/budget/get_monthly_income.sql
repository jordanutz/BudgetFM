select * from user_income 
join income_categories on user_income.category_id = income_categories.id
where user_id = $1 and calendar = $2 