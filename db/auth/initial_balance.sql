INSERT INTO user_balance 
(user_id, balance)
VALUES
($1, $2)
returning*