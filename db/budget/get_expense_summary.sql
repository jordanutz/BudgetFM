select ec.category, sum(amount) from expense_category as ec
left join (
    select amount, category_id from user_expense
    where user_id = $1 and calendar = $2
) as ue ON ue.category_id = ec.id group by ec.category, ue.category_id
order by ec.category asc;