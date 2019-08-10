CREATE TABLE users (
  id serial primary key,
  name varchar(40) not null, 
  email varchar(255) not null, 
  password text not null
)

CREATE TABLE balance (
  id serial primary key, 
  user_id references users(id), 
  balance integer not null
)

CREATE TABLE income (
  id sertial primary key, 
  user_id references users(id)
  date_posted text not null, 
  description varchar(255), 
  category_id references categories(id), 
  amount integer not null, 
)

CREATE TABLE expenses (
  id sertial primary key, 
  user_id references users(id)
  date_posted text not null, 
  description varchar(255), 
  category_id references categories(id), 
  amount integer not null, 
)
