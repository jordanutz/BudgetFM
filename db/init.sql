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
  user_id integer references users(id)
  date_posted text not null, 
  description varchar(255), 
  category_id references income_categories(id), 
  amount integer not null, 
)

CREATE TABLE user_expenses (
  id serial primary key, 
  user_id integer references users(id)
  date_posted text not null, 
  description varchar(255), 
  category_id references expense_categories(id), 
  amount integer not null, 
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

Expenses: 
Clothing: <i class="fas fa-tshirt"></i>
Food: <i class="fas fa-ice-cream"></i>
Payments: <i class="fas fa-money-check"></i>
Home: <i class="fas fa-home"></i>
Education: <i class="fas fa-graduation-cap"></i>
Recreation: <i class="fas fa-futbol"></i>
Transportation: <i class="fas fa-car"></i>
Other: <i class="fab fa-superpowers"></i>

Income: 
Gift: <i class="fas fa-gift"></i>
Salary: <i class="fas fa-dollar-sign"></i>
Rewards: <i class="fas fa-seedling"></i>
Coins: <i class="fas fa-coins"></i>
Other: <i class="fab fa-superpowers"></i>
