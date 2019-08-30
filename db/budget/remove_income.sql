UPDATE user_balance SET balance = balance - $2 WHERE user_id = $1
returning*;