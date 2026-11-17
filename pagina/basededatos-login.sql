/* create database perfiles */
create table usuarios (
    nombre varchar(32) not null;
    apellido varchar(32) not null;
    contraseña varbinary(max) not null;
    rango tinyint not null
);