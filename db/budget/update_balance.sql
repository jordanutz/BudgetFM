update user_balance set balance = $2 where id = $1
returning *;