INSERT INTO products (prod_name, product_desc, price, product_status)VALUES 
('Hamburgesa Doble', 'Hamburguesa al carbon doble carne + lechuga + queso + tomate y salsa de la casa', 25000, 1),
('Tacos Mexicanos', '4 Tacos de arrachera + pico de gallo', 35000, 1),
('Pizza de la casa', 'pizza con salami + queso mozarella + pimenton', 35000, 1);

INSERT INTO payment_methods (payment_desc)VALUES 
('Efectivo'),
('Tarjeta');

INSERT INTO order_status (status_desc)VALUES 
('Confirmada'),
('En preparación'),
('En camino'),
('Entregada'),
('Cancelada');

