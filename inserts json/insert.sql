-- Create the database
CREATE DATABASE IF NOT EXISTS tr2_multiplicat_DAWTR2G6;

-- Use the database
USE tr2_multiplicat_DAWTR2G6;

-- Create the "categoria" table
CREATE TABLE IF NOT EXISTS categoria (
    id INT PRIMARY KEY,
    nombre_categoria VARCHAR(255) NOT NULL
);

-- Create the "preguntas" table
CREATE TABLE IF NOT EXISTS preguntas (
    id INT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    opciones TEXT NOT NULL,
    respuesta_correcta VARCHAR(255) NOT NULL,
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Insert data into the "categoria" table
INSERT INTO categoria (id, nombre_categoria) VALUES
(1, 'massa'), (2, 'volumen'), (3, 'longitud'), (4, 'capacitat'), (5, 'superficie'), (6, 'temps');
