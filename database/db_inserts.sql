INSERT INTO products (prod_name, product_desc, price, product_status)VALUES 
('Cerveza tipo pilsen', 'cerveza de barril', 5000, 0);
('Cocacola zero', 'coca zero', 4000, 1);

INSERT INTO payment_methods (payment_desc)VALUES 
('Efectivo'),
('Tarjeta');
('Pendiente');

INSERT INTO order_status (status_desc)VALUES 
('Confirmada'),
('En preparación'),
('En camino'),
('Entregada'),
('Cancelada');

INSERT INTO orders (email, payment_code, order_address, status_id)VALUES 
('gustavocarrena@gmail.com',3,'Belgrano 3629',6);
