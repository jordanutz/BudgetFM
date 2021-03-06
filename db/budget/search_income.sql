SELECT user_income.id AS income, date_posted, description, amount, calendar, category, icon FROM user_income 
INNER JOIN income_category ON user_income.category_id = income_category.id
WHERE user_id = $1 AND calendar =  $2 AND description ILIKE CONCAT($3, '%') OR category ILIKE CONCAT($3, '%')