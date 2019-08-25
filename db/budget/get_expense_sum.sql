SELECT sum(amount) FROM user_expense
WHERE user_id = $1 AND calendar = $2