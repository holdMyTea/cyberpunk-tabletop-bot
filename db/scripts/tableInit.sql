SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

USE cyberpunk;

CREATE TABLE attributes (
  id INT(2) UNSIGNED PRIMARY KEY,
  name VARCHAR(10) NOT NULL
);

INSERT INTO attributes (id, name) VALUES
  (1,'INT'),
  (2,'REF'),
  (3,'TECH'),
  (4,'COOL'),
  (5,'ATTR'),
  (6,'EMP'),
  (7,'BODY'),
  (8,'MA'),
  (9,'LUCK');

CREATE TABLE skills (
  id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  attribute_id INT(2) UNSIGNED,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE SET NULL
);

-- INT skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Бухгалтерия', 1),
  ('Антропология', 1),
  ('Замечать/Узнавать', 1),
  ('Биология', 1),
  ('Ботаника', 1),
  ('Химия', 1),
  ('Диагностика болезней', 1),
  ('Образование и Общие знания', 1),
  ('Эксперт', 1),
  ('Азартные игры', 1),
  ('Геология', 1),
  ('Прятаться/Избегать', 1), 
  ('История', 1),
  ('Использование Библиотек', 1),
  ('Математика', 1),
  ('Физика', 1),
  ('Программирование', 1),
  ('Следить/Шпионить', 1),
  ('Игра на Бирже', 1),
  ('Знание Сети', 1),
  ('Преподавание', 1),
  ('Выживание', 1),
  ('Зоология', 1),
  ('Композиция', 1);

SELECT * FROM skills WHERE name='Биология';

-- REF skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Лук/Арбалет', 2),
  ('Атлетика', 2),
  ('Борьба', 2),
  ('Танцевать', 2),
  ('Уклонение', 2),
  ('Вождение', 2),
  ('Фехтование', 2),
  ('Пистолет', 2),
  ('Тяжелое Оружие', 2),
  ('Боевые Искусства', 2),
  ('Ближний Бой', 2),
  ('Управление Мотоциклом', 2),
  ('Управление тяж. Транспортом', 2),
  ('Пилотирование (Вертолет)', 2),
  ('Пилотирование (Самолет)', 2),
  ('Пилотирование (Дирижабль)', 2),
  ('Пилотирование (AV/Аэродайн)', 2),
  ('Ружье', 2),
  ('Скрытность', 2),
  ('Пистолет-Пулемет', 2);

-- TECH skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Технология (Самолет)',3),
  ('Технология (AV/Аэродайн)',3),
  ('Базовая Технология',3),
  ('Управление Криокамерой',3),
  ('Технология (Кибердека)',3),
  ('Кибертехнология',3),
  ('Взрывчатка',3),
  ('Маскировка',3),
  ('Электроника',3),
  ('Электронная Безопасность',3),
  ('Первая Помощь',3),
  ('Подделка',3),
  ('Технология (Вертолет)',3),
  ('Рисование',3),
  ('Кино-фотосъёмка',3),
  ('Фармацевтика',3),
  ('Вскрытие Замков',3),
  ('Кража',3),
  ('Игра на Инструменте',3),
  ('Технология (Оружие)',3);

-- COOL skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Допрос',4),
  ('Угрожать/Запугивать',4),
  ('Красноречие',4),
  ('Устойчивость к наркотикам/пыткам',4),
  ('Знание Улиц',4);

-- ATTR skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Внешний Вид',5),
  ('Гардероб и Стиль',5);

-- EMP skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Понимание Людей',6),
  ('Интервью',6),
  ('Лидерство',6),
  ('Соблазнение',6),
  ('Хорошие Манеры',6),
  ('Убеждать и Заговаривать Зубы',6),
  ('Публичные Выступления',6);

-- BODY skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Выносливость',7),
  ('Проявление Силы',7),
  ('Плавание',7);

-- role-bound skills
INSERT INTO skills (name, attribute_id) VALUES
  ('Авторитет',NULL),
  ('Харизматичное Лидерство',NULL),
  ('Чувство Боя',NULL),
  ('Правдоподобность',NULL),
  ('Семья',NULL),
  ('Аварийный Ремонт',NULL),
  ('Интерфейс',NULL),
  ('Медтехника',NULL),
  ('Ресурсы',NULL),
  ('Блат',NULL);

CREATE TABLE users (
  id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL,
  discord_id VARCHAR(40) NOT NULL
);

CREATE TABLE characters (
  id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  user_id INT(8) UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE char_attrs (
  attr_value INT(2) UNSIGNED NOT NULL,
  attribute_id INT(2) UNSIGNED,
  char_id INT(8) UNSIGNED,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE SET NULL,
  FOREIGN KEY (char_id) REFERENCES characters(id) ON DELETE SET NULL
);

CREATE TABLE char_skills (
  skill_value INT(2) UNSIGNED NOT NULL,
  skill_id INT(4) UNSIGNED,
  char_id INT(8) UNSIGNED,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE SET NULL,
  FOREIGN KEY (char_id) REFERENCES characters(id) ON DELETE SET NULL
);
