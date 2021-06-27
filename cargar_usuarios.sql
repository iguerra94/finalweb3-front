    mysql -uroot -proot;
    use testw3;

    /* Alta de usuarios */

    /* Usuario admin */
    INSERT INTO user (id, username, password, name, last_name) VALUES (1, 'admin', '$2a$04$q26uBnOAogs665diBqMWgepW/GfJeb3fV4TRGInmRnY5/pt3hIh6e', 'Admin', 'Admin');

    /* Usuarios normales */
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

