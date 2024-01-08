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


-- Inserts para preguntas de la categoría "massa"
INSERT INTO preguntas (pregunta, opciones, respuesta_correcta, categoria_id) VALUES
('¿Cuál es la masa de un objeto con una densidad de 2 kg/m³ y un volumen de 5 m³?', '{"opcion1": "8 kg", "opcion2": "10 kg", "opcion3": "12 kg", "opcion4": "15 kg"}', '10 kg', 1),
('¿Cómo se calcula la masa de un cuerpo?', '{"opcion1": "Masa = Densidad × Volumen", "opcion2": "Masa = Fuerza / Aceleración", "opcion3": "Masa = Energía / Velocidad", "opcion4": "Masa = Peso / Gravedad"}', 'Masa = Densidad × Volumen', 1),
('¿Cuál es la relación entre masa y peso?', '{"opcion1": "Son iguales", "opcion2": "Depende de la ubicación", "opcion3": "El peso es la fuerza gravitatoria sobre la masa", "opcion4": "No hay relación"}', 'El peso es la fuerza gravitatoria sobre la masa', 1),
('Si la masa de un objeto es de 5 kg, ¿cuál es su peso en la Tierra?', '{"opcion1": "50 N", "opcion2": "10 N", "opcion3": "20 N", "opcion4": "5 N"}', '50 N', 1),
('¿Qué unidad se utiliza para medir la masa?', '{"opcion1": "Newton", "opcion2": "Kilogramo", "opcion3": "Metros cúbicos", "opcion4": "Litros"}', 'Kilogramo', 1),
('¿Cómo afecta la densidad a la masa y al volumen de un objeto?', '{"opcion1": "A mayor densidad, mayor masa", "opcion2": "A menor densidad, mayor volumen", "opcion3": "No hay relación", "opcion4": "A menor densidad, menor masa"}', 'A mayor densidad, mayor masa', 1),
('¿Cuál es la fórmula para calcular la densidad?', '{"opcion1": "Densidad = Masa / Volumen", "opcion2": "Densidad = Peso / Volumen", "opcion3": "Densidad = Fuerza / Aceleración", "opcion4": "Densidad = Volumen / Masa"}', 'Densidad = Masa / Volumen', 1),
('¿Puede un objeto tener masa cero?', '{"opcion1": "Sí", "opcion2": "No", "opcion3": "Depende del material", "opcion4": "Solo en el espacio"}', 'No', 1),
('Explique la ley de conservación de la masa.', '{"opcion1": "La masa de un sistema cerrado permanece constante con el tiempo", "opcion2": "La masa se destruye en ciertas reacciones químicas", "opcion3": "La masa aumenta en cualquier proceso", "opcion4": "La masa depende de la temperatura"}', 'La masa de un sistema cerrado permanece constante con el tiempo', 1),
('¿Cuál es la diferencia entre masa y peso?', '{"opcion1": "La masa es una fuerza, y el peso es una medida de la cantidad de materia", "opcion2": "La masa es una medida de la cantidad de materia, y el peso es la fuerza gravitatoria sobre la masa", "opcion3": "No hay diferencia", "opcion4": "La masa y el peso son términos intercambiables"}', 'La masa es una medida de la cantidad de materia, y el peso es la fuerza gravitatoria sobre la masa', 1),
('Si tienes un bloque de metal con una masa de 500 g y cortas una parte que tiene una masa de 150 g, ¿cuál es la masa restante del bloque original?', '{"opcion1": "350 g", "opcion2": "450 g", "opcion3": "500 g", "opcion4": "650 g", "opcion_correcta": "350 g"}', '350 g', 1),
('Una caja tiene una masa de 2 kg. Si le añades tres manzanas, cada una con una masa de 150 g, ¿cuál es la masa total de la caja y las manzanas?', '{"opcion1": "2.45 kg", "opcion2": "2.50 kg", "opcion3": "2.70 kg", "opcion4": "3.00 kg", "opcion_correcta": "2.70 kg"}', '2.70 kg', 1),
('Imagina que tienes una mezcla de dos sustancias. Si la primera tiene una masa de 300 g y la segunda una masa de 500 g, ¿cuál es la masa total de la mezcla?', '{"opcion1": "700 g", "opcion2": "800 g", "opcion3": "900 g", "opcion4": "1000 g", "opcion_correcta": "800 g"}', '800 g', 1),
('Si tienes una caja con libros y su masa es de 1.5 kg, ¿cuál es la masa promedio de cada libro si hay 6 libros en la caja?', '{"opcion1": "150 g", "opcion2": "200 g", "opcion3": "250 g", "opcion4": "300 g", "opcion_correcta": "250 g"}', '250 g', 1),
('Imagina que tienes una barra de oro con una masa de 750 g. Si cortas la barra en tres partes iguales, ¿cuánto pesa cada parte?', '{"opcion1": "250 g", "opcion2": "375 g", "opcion3": "500 g", "opcion4": "625 g", "opcion_correcta": "250 g"}', '250 g', 1),
('Si un objeto tiene una masa de 0.2 kg y cae desde una altura de 5 metros, ¿cuál será su energía potencial gravitatoria?', '{"opcion1": "1 J", "opcion2": "2 J", "opcion3": "5 J", "opcion4": "10 J", "opcion_correcta": "10 J"}', '10 J', 1),
('Si tienes una mezcla de harina y azúcar, y la harina tiene una masa de 300 g y el azúcar una masa de 200 g, ¿cuál es la proporción de masa de harina respecto a la masa total?', '{"opcion1": "40%", "opcion2": "50%", "opcion3": "60%", "opcion4": "70%", "opcion_correcta": "60%"}', '60%', 1),
('Si una persona pesa 70 kg en la Tierra, ¿cuál sería su peso en la Luna, donde la gravedad es aproximadamente 1/6 de la terrestre?', '{"opcion1": "10 kg", "opcion2": "20 kg", "opcion3": "30 kg", "opcion4": "40 kg", "opcion_correcta": "10 kg"}', '10 kg', 1),
('Un recipiente contiene agua con una masa de 800 g y hielo con una masa de 200 g. ¿Cuál es la masa total del contenido del recipiente?', '{"opcion1": "800 g", "opcion2": "900 g", "opcion3": "1000 g", "opcion4": "1100 g", "opcion_correcta": "1000 g"}', '1000 g', 1);

