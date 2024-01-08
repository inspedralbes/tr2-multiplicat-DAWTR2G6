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


-- Inserts para preguntas de la categoría "volumen"
INSERT INTO preguntas (pregunta, opciones, respuesta_correcta, categoria_id) VALUES
('¿Cuál es el volumen de un cubo con arista de 3 metros?', '{"opcion1": "6 m³", "opcion2": "9 m³", "opcion3": "18 m³", "opcion4": "27 m³"}', '27 m³', 2),
('Explica cómo se calcula el volumen de un objeto irregular.', '{"opcion1": "Por la fórmula V = l × a × h", "opcion2": "Por la fórmula V = πr²h", "opcion3": "No se puede calcular el volumen de un objeto irregular", "opcion4": "Por la fórmula V = B × h"}', 'No se puede calcular el volumen de un objeto irregular', 2),
('¿Cuál es la relación entre el volumen y la forma de un objeto?', '{"opcion1": "El volumen depende únicamente de la forma", "opcion2": "La forma no afecta el volumen", "opcion3": "Objetos de formas diferentes pueden tener el mismo volumen", "opcion4": "La forma determina el volumen y la masa"}', 'Objetos de formas diferentes pueden tener el mismo volumen', 2),
('Si el volumen de un líquido es de 500 ml, ¿cuántos litros son?', '{"opcion1": "0.5 L", "opcion2": "5 L", "opcion3": "50 L", "opcion4": "5000 L"}', '0.5 L', 2),
('¿Cómo se mide el volumen de un gas?', '{"opcion1": "En litros", "opcion2": "En metros cúbicos", "opcion3": "En gramos", "opcion4": "En kilogramos"}', 'En litros', 2),
('¿Puede el volumen de un objeto ser negativo?', '{"opcion1": "Sí", "opcion2": "No", "opcion3": "Solo en el espacio", "opcion4": "Depende del material"}', 'No', 2),
('Explica la ley de Boyle en relación con el volumen de los gases.', '{"opcion1": "El volumen de un gas es inversamente proporcional a su presión", "opcion2": "El volumen de un gas es directamente proporcional a su temperatura", "opcion3": "El volumen de un gas es constante a diferentes presiones", "opcion4": "El volumen de un gas no está relacionado con la presión"}', 'El volumen de un gas es inversamente proporcional a su presión', 2),
('Un cubo tiene una arista de 2 metros. ¿Cuál es su volumen?', '{"opcion1": "2 m³", "opcion2": "4 m³", "opcion3": "6 m³", "opcion4": "8 m³"}', '6 m³', 2),
('Si tienes un cilindro con radio de 3 metros y altura de 4 metros, ¿cuál es el volumen del cilindro?', '{"opcion1": "12π m³", "opcion2": "24π m³", "opcion3": "36π m³", "opcion4": "48π m³"}', '12π m³', 2),
('Un cono tiene radio de 5 metros y altura de 7 metros. ¿Cuál es el volumen del cono?', '{"opcion1": "58.33π m³", "opcion2": "108.33π m³", "opcion3": "183.33π m³", "opcion4": "275π m³"}', '183.33π m³', 2),
('Si tienes una esfera con radio de 4 metros, ¿cuál es su volumen?', '{"opcion1": "33.51π m³", "opcion2": "67.03π m³", "opcion3": "100.54π m³", "opcion4": "134.06π m³"}', '67.03π m³', 2),
('Un prisma rectangular tiene una base de 6 metros por 9 metros y una altura de 8 metros. ¿Cuál es el volumen del prisma?', '{"opcion1": "324 m³", "opcion2": "432 m³", "opcion3": "540 m³", "opcion4": "648 m³"}', '432 m³', 2),
('Si tienes un tetraedro con una arista de 3 metros, ¿cuál es su volumen?', '{"opcion1": "3√2 m³", "opcion2": "9√2 m³", "opcion3": "18√2 m³", "opcion4": "27√2 m³"}', '3√2 m³', 2),
('Un cubo tiene una diagonal de 4 metros. ¿Cuál es su volumen?', '{"opcion1": "8 m³", "opcion2": "16 m³", "opcion3": "32 m³", "opcion4": "64 m³"}', '32 m³', 2),
('Si tienes un cilindro con diámetro de 6 metros y altura de 10 metros, ¿cuál es el volumen del cilindro?', '{"opcion1": "90π m³", "opcion2": "180π m³", "opcion3": "270π m³", "opcion4": "360π m³"}', '180π m³', 2),
('Un cono tiene radio de 8 metros y altura de 12 metros. ¿Cuál es el volumen del cono?', '{"opcion1": "268.22π m³", "opcion2": "536.44π m³", "opcion3": "804.66π m³", "opcion4": "1072.88π m³"}', '536.44π m³', 2),
('Si tienes una esfera con circunferencia de 18 metros, ¿cuál es su volumen?', '{"opcion1": "36π m³", "opcion2": "54π m³", "opcion3": "72π m³", "opcion4": "90π m³"}', '72π m³', 2);


-- Inserts para preguntas de la categoría "capacitat"
INSERT INTO preguntas (pregunta, opciones, respuesta_correcta, categoria_id) VALUES
('¿Cuál es la fórmula para calcular la capacidad de un recipiente cúbico?', '{"opcion1": "Capacidad = Lado × Lado × Lado", "opcion2": "Capacidad = Longitud × Ancho × Altura", "opcion3": "Capacidad = Área de la base × Altura", "opcion4": "Capacidad = Diámetro × Diámetro × Altura"}', 'Capacidad = Longitud × Ancho × Altura', 4),
('Si tienes un tanque con una capacidad de 500 litros y ya contiene 250 litros de agua, ¿cuánto más puedes agregar?', '{"opcion1": "250 litros", "opcion2": "500 litros", "opcion3": "750 litros", "opcion4": "1000 litros"}', '250 litros', 4),
('¿Cómo se calcula la capacidad de un cilindro?', '{"opcion1": "Capacidad = Longitud × Ancho × Altura", "opcion2": "Capacidad = Área de la base × Altura", "opcion3": "Capacidad = πr²h", "opcion4": "Capacidad = Diámetro × Diámetro × Altura"}', 'Capacidad = πr²h', 4),
('Si tienes dos recipientes con la misma capacidad, pero uno es más ancho que el otro, ¿cuál de ellos tiene mayor capacidad?', '{"opcion1": "El más ancho", "opcion2": "El más estrecho", "opcion3": "Ambos tienen la misma capacidad", "opcion4": "Depende de la altura"}', 'Ambos tienen la misma capacidad', 4),
('¿Cuál es la unidad comúnmente utilizada para medir la capacidad de un recipiente?', '{"opcion1": "Metros cúbicos", "opcion2": "Litros", "opcion3": "Centímetros cúbicos", "opcion4": "Kilogramos"}', 'Litros', 4),
('Explique cómo se determina la capacidad de un recipiente no uniforme.', '{"opcion1": "Sumando las capacidades de cada sección", "opcion2": "Restando las capacidades de cada sección", "opcion3": "Multiplicando las capacidades de cada sección", "opcion4": "Dividiendo las capacidades de cada sección"}', 'Sumando las capacidades de cada sección', 4),
('Si tienes una botella con una capacidad de 750 ml y bebes la mitad, ¿cuántos mililitros quedan en la botella?', '{"opcion1": "375 ml", "opcion2": "500 ml", "opcion3": "250 ml", "opcion4": "600 ml"}', '375 ml', 4),
('¿Puede la capacidad de un recipiente ser negativa?', '{"opcion1": "Sí", "opcion2": "No", "opcion3": "Solo en casos especiales", "opcion4": "Depende del material"}', 'No', 4),
('¿Cómo afecta la forma de un recipiente a su capacidad?', '{"opcion1": "La forma no afecta la capacidad", "opcion2": "La capacidad depende únicamente de la altura", "opcion3": "La forma afecta la capacidad solo en los cilindros", "opcion4": "La forma puede afectar la capacidad"}', 'La forma puede afectar la capacidad', 4),
('¿Qué significa cuando se dice que un recipiente está al 50% de su capacidad?', '{"opcion1": "Está medio lleno", "opcion2": "Está medio vacío", "opcion3": "Está lleno hasta la mitad", "opcion4": "No se puede determinar"}', 'Está lleno hasta la mitad', 4),
('Si un recipiente tiene una capacidad de 500 ml y le añades 300 ml más, ¿cuánta capacidad total tendrá el recipiente?', '{"opcion1": "600 ml", "opcion2": "700 ml", "opcion3": "800 ml", "opcion4": "900 ml", "opcion_correcta": "800 ml"}', '800 ml', 3),
('Tienes un vaso con una capacidad de 250 ml y otro vaso con una capacidad de 150 ml. ¿Cuántos mililitros necesitas verter del primer vaso al segundo para que ambos tengan la misma cantidad de líquido?', '{"opcion1": "50 ml", "opcion2": "75 ml", "opcion3": "100 ml", "opcion4": "125 ml", "opcion_correcta": "100 ml"}', '100 ml', 3),
('Una botella tiene una capacidad de 1.5 litros y otra botella tiene el doble de capacidad. ¿Cuántos litros tiene la segunda botella?', '{"opcion1": "2 litros", "opcion2": "3 litros", "opcion3": "4 litros", "opcion4": "5 litros", "opcion_correcta": "4 litros"}', '4 litros', 3),
('Si una jarra tiene una capacidad de 750 ml y le retiras 200 ml de líquido, ¿cuánta capacidad total tendrá la jarra después de retirar el líquido?', '{"opcion1": "400 ml", "opcion2": "550 ml", "opcion3": "650 ml", "opcion4": "750 ml", "opcion_correcta": "750 ml"}', '750 ml', 3),
('Tienes tres botellas con capacidades de 300 ml, 500 ml y 700 ml, respectivamente. ¿Cuál es la capacidad total si unes el contenido de las tres botellas en una sola?', '{"opcion1": "1200 ml", "opcion2": "1500 ml", "opcion3": "1800 ml", "opcion4": "2100 ml", "opcion_correcta": "1500 ml"}', '1500 ml', 3),
('Un recipiente tiene una capacidad de 2 litros y contiene 1.3 litros de agua. ¿Cuántos litros de espacio vacío hay en el recipiente?', '{"opcion1": "0.3 litros", "opcion2": "0.5 litros", "opcion3": "0.7 litros", "opcion4": "1 litro", "opcion_correcta": "0.7 litros"}', '0.7 litros', 3),
('Tienes una jarra con una capacidad de 1.2 litros y otra jarra con una capacidad de 900 ml. ¿Cuántos mililitros más puede contener la primera jarra que la segunda?', '{"opcion1": "100 ml", "opcion2": "200 ml", "opcion3": "300 ml", "opcion4": "400 ml", "opcion_correcta": "200 ml"}', '200 ml', 3),
('Si una botella tiene una capacidad de 750 ml y otra botella tiene el doble de capacidad, ¿cuántos mililitros tiene la segunda botella?', '{"opcion1": "750 ml", "opcion2": "1000 ml", "opcion3": "1250 ml", "opcion4": "1500 ml", "opcion_correcta": "1000 ml"}', '1000 ml', 3),
('Tienes dos vasos con capacidades de 400 ml y 600 ml, respectivamente. ¿Cuántos mililitros necesitas verter del segundo vaso al primero para que ambos tengan la misma cantidad de líquido?', '{"opcion1": "100 ml", "opcion2": "150 ml", "opcion3": "200 ml", "opcion4": "250 ml", "opcion_correcta": "200 ml"}', '200 ml', 3),
('Si una jarra tiene una capacidad de 1 litro y le añades 750 ml más, ¿cuánta capacidad total tendrá la jarra?', '{"opcion1": "1.25 litros", "opcion2": "1.5 litros", "opcion3": "1.75 litros", "opcion4": "2 litros", "opcion_correcta": "1.75 litros"}', '1.75 litros', 3);

