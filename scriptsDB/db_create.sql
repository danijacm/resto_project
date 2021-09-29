CREATE DATABASE dani_resto_db

CREATE TABLE users (
  user_id int(3) NOT NULL AUTO_INCREMENT,
  email varchar(50) NOT NULL,
  fullname varchar (150) NOT NULL,
  phone varchar(15) NOT NULL,
  user_address varchar(150) NOT NULL,
  user_password varchar(20) NOT NULL,
  user_admin int(1) NOT NULL,
  PRIMARY KEY (user_id)
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
  user_id int(3),
  email varchar(20),
  payment_code int(1) NOT NULL,
  order_date timestamp,
  order_address varchar(150) NOT NULL,
  status_id int(1),
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (payment_code) REFERENCES payment_methods(payment_code),
  FOREIGN KEY (status_id) REFERENCES order_status(status_id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


--https://www.mysqltutorial.org/mysql-on-delete-cascade/




u.fullname, u.email, u.phone -- Tabla usuario
o.order_address, -- Tabla Order
pm.payment_desc -- Tabla payment_methods
os.status_desc -- Order_status
op.quantity -- Tabla Order_products
p.prod_name, p.price -- Tabla Products



--Extrae los datos del usaario y el código de estado de la orden y el código de pago
select u.fullname, o.order_address, o.order_id, o.status_id, o.payment_code from users u
join orders o on (u.user_id = o.user_id) where u.user_id = 2 and o.status_id != 4 and o.status_id != 5;

-- Extrae el estado de la ordern y la forma de pago seleccionada por el usuario
select o.status_id, o.payment_code, os.status_desc, pm.payment_desc 
from orders o
join order_status os 
on (o.status_id = os.status_id)
join payment_methods pm 
on (o.payment_code = pm.payment_code) where o.status_id = 3 and o.payment_code = 2; 


select op.quantity, p.prod_name, p.price 
from order_products op
join products p
on (op.product_id = p.product_id) 


