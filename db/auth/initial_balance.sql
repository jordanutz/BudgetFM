INSERT INTO user_balance 
(user_id, balance)
values 
($1, $2)
returning*