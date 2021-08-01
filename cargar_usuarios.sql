/* Ingresar al contenedor de docker donde esta corriendo mysql */ 

/* Ejecutar mysql desde la consola */
-- Password mysql: root
mysql -uroot -proot;

/* Usar tabla testw3 */
use testw3;

/* Alta de usuarios */

/* Usuario admin */
/* Password: admin */
INSERT INTO user (id, username, password, name, last_name) VALUES (1, 'admin', '$2a$10$BjJ.J3UhGwn.7DRSMqnPSOI.7OPWrVuShLtrQL34wu17k5pzv/2KG', 'Admin', 'Admin');

/* Usuarios normales */
/* Password: password */
INSERT INTO user (id, username, password, name, last_name) VALUES (2, 'iguerra94', '$2a$10$lQAWoxtO.pAEIotoRVn9C.ocrYVNLBHAK9vVfIkoQ5xKzOgizHqHO', 'Ivan', 'Guerra');

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

