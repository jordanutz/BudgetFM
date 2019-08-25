DROP TABLE user_account cascade
DROP TABLE user_balance
DROP TABLE user_income
DROP TABLE user_expense
DROP TABLE expense_category
DROP TABLE income_category

CREATE TABLE user_account (
  id serial primary key,
  name varchar(40) not null, 
  email varchar(255) not null, 
  password text not null
)

CREATE TABLE user_balance (
  id serial primary key, 
  user_id integer references user_account(id), 
  balance integer not null
)

CREATE TABLE user_income (
  id serial primary key, 
  user_id integer references user_account(id),
  date_posted text not null, 
  description varchar(255), 
  category_id integer references income_category(id), 
  amount integer not null, 
  calendar text not null
)

CREATE TABLE user_expense (
  id serial primary key, 
  user_id integer references user_account(id),
  date_posted text not null, 
  description varchar(255), 
  category_id integer references expense_category(id), 
  amount integer not null, 
  calendar text not null
)

CREATE TABLE income_category (
  id serial primary key, 
  type text not null, 
  icon text not null
)

CREATE TABLE expense_category (
  id serial primary key, 
  type text not null, 
  icon text not null
)

INSERT INTO expense_category
(type, icon)
values
('Payments', 'fas fa-money-check'), 
('Food', 'fas fa-pizza-slice'), 
('Home', 'fas fa-home'), 
('Clothing', 'fas fa-tshirt'), 
('Education', 'fas fa-graduation-cap'), 
('Recreation', 'fas fa-futbol'), 
('Transportation', 'fas fa-car'), 
('Other', 'fab fa-superpowers')

INSERT INTO income_category
(type, icon)
values
('Gift', 'fas fa-gift'), 
('Investment', 'fas fa-coins'), 
('Rewards', 'fas fa-seedling'), 
('Salary', 'fas fa-dollar-sign'),
('Other', 'fab fa-superpowers')

