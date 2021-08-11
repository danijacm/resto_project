CREATE DATABASE dani_resto_db

CREATE TABLE users (
  email varchar(50) NOT NULL,
  fullname varchar (150) NOT NULL,
  phone varchar(15) NOT NULL,
  user_address varchar(150) NOT NULL,
  user_password varchar(20) NOT NULL,
  user_admin int(1) NOT NULL,
  PRIMARY KEY (email)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE products (
  product_id int(3) NOT NULL AUTO_INCREMENT,
  prod_name varchar (100) NOT NULL,
  product_desc varchar(250),
  price int(6) unsigned NOT NULL,
  product_status int(1) NOT NULL,
  PRIMARY KEY (product_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE order_status (
  status_id int(1) NOT NULL AUTO_INCREMENT,
  status_desc varchar(20) NOT NULL,
  PRIMARY KEY (status_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE order_products (
  order_id int(6),
  product_id int(3),
  quantity int(3) unsigned NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id),
  PRIMARY KEY (order_id, product_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE payment_methods (
  payment_code INT(1) NOT NULL AUTO_INCREMENT,
  payment_desc VARCHAR(20) NOT NULL,
  PRIMARY KEY (payment_code)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE orders (
  order_id int(8) NOT NULL AUTO_INCREMENT,
  email varchar(20),
  payment_code int(1) NOT NULL,
  order_date timestamp,
  order_address varchar(150) NOT NULL,
  status_id int(1),
  PRIMARY KEY (order_id),
  FOREIGN KEY (email) REFERENCES users(email),
  FOREIGN KEY (payment_code) REFERENCES payment_methods(payment_code),
  FOREIGN KEY (status_id) REFERENCES order_status(status_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


--https://www.mysqltutorial.org/mysql-on-delete-cascade/




