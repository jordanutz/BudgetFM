select sum(amount) from user_income
where user_id = $1 and calendar = $2