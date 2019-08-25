UPDATE user_balance SET balance = $2 WHERE id = $1
returning *;