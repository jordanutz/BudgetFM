SELECT sum(amount) FROM user_income
WHERE user_id = $1 AND calendar = $2