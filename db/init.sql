CREATE TABLE users (
  id serial primary key,
  name varchar(40) not null, 
  email varchar(255) not null, 
  password text not null
)

CREATE TABLE user_balance (
  id serial primary key, 
  user_id integer references users(id), 
  balance integer not null
)

CREATE TABLE user_income (
  id serial primary key, 
  user_id integer references users(id),
  date_posted text not null, 
  description varchar(255), 
  category_id integer references income_categories(id), 
  amount integer not null
)

select * from user_income 
join income_categories on user_income.category_id = income_categories.id
where user_id = $1 and calendar = $2 

CREATE TABLE user_expenses (
  id serial primary key, 
  user_id integer references users(id),
  date_posted text not null, 
  description varchar(255), 
  category_id integer references expense_categories(id), 
  amount integer not null
)

CREATE TABLE income_categories (
  id serial primary key, 
  type text not null, 
  icon text not null
)

CREATE TABLE expense_categories (
  id serial primary key, 
  type text not null, 
  icon text not null
)

insert into expense_categories 
(type, icon)
values
('CLothing', 'fas fa-tshirt'), 
('Food', 'fas fa-ice-cream'), 
('Payments', 'fas fa-money-check'), 
('Home', 'fas fa-home'), 
('Education', 'fas fa-graduation-cap'), 
('Recreation', 'fas fa-futbol'), 
('Transporation', 'fas fa-car'), 
('Other', 'fab fa-superpowers')

insert into income_categories
(type, icon)
values
('Gift', 'fas fa-gift'), 
('Investment', 'fas fa-coins'), 
('Rewards', 'fas fa-seedling'), 
('Salary', 'fas fa-dollar-sign'),
('Other', 'fab fa-superpowers')

