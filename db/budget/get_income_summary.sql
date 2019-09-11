select ic.category, sum(amount) from income_category as ic
left join (
    select amount, category_id from user_income
    where user_id = $1 and calendar = $2
) as ui ON ui.category_id = ic.id group by ic.category, ui.category_id
order by ic.category asc;