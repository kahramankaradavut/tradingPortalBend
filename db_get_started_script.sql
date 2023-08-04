CREATE DATABASE tradingdb CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE tradingdb;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone_number VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  status VARCHAR(255),
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE product_offers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(255),
  offering_product_id INT,
  offered_product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (offering_product_id) REFERENCES products(id),
  FOREIGN KEY (offered_product_id) REFERENCES products(id)
);

CREATE TABLE favorites (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  user_id INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE forgot_password (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  token VARCHAR(255),
  expiration_time DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, password, email, phone_number) 
VALUES ('user1first_name', 'user1last_name', 'user1password', 'user1email', 'user1phone_number'), ('user2first_name', 'user2last_name', 'user2password', 'user2email', 'user2phone_number'), ('user3first_name', 'user3last_name', 'user3password', 'user3email', 'user3phone_number');

INSERT INTO products (title, description, image, status, user_id) 
VALUES ('product1title', 'product1description', 'product1image', 'active', 1), ('product2title', 'product2description', 'product2image', 'active', 1), ('product3title', 'product3description', 'product3image', 'active', 1), ('product4title', 'product4description', 'product4image', 'active', 2), ('product5title', 'product5description', 'product5image', 'active', 3), ('product6title', 'product6description', 'product6image', 'active', 2);

INSERT INTO favorites (user_id, product_id) 
VALUES (1, 1);

INSERT INTO comments (product_id, user_id, comment) 
VALUES (1, 1, 'comment1comment');