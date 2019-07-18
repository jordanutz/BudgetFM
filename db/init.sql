CREATE TABLE users (
  id serial primary key,
  name varchar(40) not null, 
  email varchar(255) not null, 
  password text not null
)