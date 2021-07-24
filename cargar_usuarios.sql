/* Ingresar al contenedor de docker donde esta corriendo mysql */ 

/* Ejecutar mysql desde la consola */
-- Password mysql: root
mysql -uroot -proot;

/* Usar tabla testw3 */
use testw3;

/* Alta de usuarios */

/* Usuario admin */
INSERT INTO user (id, username, password, name, last_name) VALUES (1, 'admin', '$2a$04$W/cJ.0Jbp70wtwnRLvmzjuEQTx2NfV1bMerHS/rfhzOqnknn8qoLu', 'Admin', 'Admin');

/* Usuarios normales */
/* Password: password */
INSERT INTO user (id, username, password, name, last_name) VALUES (2, 'iguerra94', '$2a$04$peoqHkMz5sqfFJTWNQw1jufompnKRQHkU3vDO9lJK8/x4/utEXVgW', 'Ivan', 'Guerra');

/* Alta de roles */

/* Rol ADMIN */
INSERT INTO role (id, description, name) VALUES (1, 'Admin role', 'ADMIN');
/* Rol USER */
INSERT INTO role (id, description, name) VALUES (2, 'User role', 'USER');

/* Relacion entre usuarios y roles */

/* Relacion entre usuario admin con rol ADMIN */
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);

/* Relaciones entre usuarios normales con rol USER */
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);

