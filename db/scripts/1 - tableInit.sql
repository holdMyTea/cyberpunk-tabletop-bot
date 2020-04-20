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
  name VARCHAR(100) NOT NULL UNIQUE,
  short_name VARCHAR(20) DEFAULT '' UNIQUE,
  attribute_id INT(2) UNSIGNED,
  FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE SET NULL
);

-- INT skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('бухгалтерия', 'бух', 1),
  ('антропология', 'антроп', 1),
  ('замечать/узнавать', 'замеч', 1),
  ('биология', 'био', 1),
  ('ботаника', 'ботан', 1),
  ('химия', 'химия', 1),
  ('диагностика болезней', 'диагноз', 1),
  ('образование и Общие знания', 'образ', 1),
  ('эксперт', 'эксперт', 1),
  ('азартные игры', 'азарт', 1),
  ('геология', 'геолог', 1),
  ('прятаться/избегать', 'прят', 1), 
  ('история', 'история', 1),
  ('использование Библиотек', 'библио', 1),
  ('математика', 'матеша', 1),
  ('физика', 'физика', 1),
  ('программирование', 'прог', 1),
  ('следить/шпионить', 'след', 1),
  ('игра на бирже', 'биржа', 1),
  ('знание сети', 'знансети', 1),
  ('преподавание', 'преподство', 1),
  ('выживание', 'выжив', 1),
  ('зоология', 'зоо', 1),
  ('композиция', 'композ', 1);

-- custom INT skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('итальянский язык', 'итал', 1),
  ('китайский язык', 'китай', 1),
  ('японсикй язык', 'япон', 1),
  ('русский язык', 'русс', 1);

-- REF skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('лук/арбалет', 'лук', 2),
  ('атлетика', 'атлет', 2),
  ('борьба', 'борьба', 2),
  ('танцевать', 'танцы', 2),
  ('уклонение', 'уклон', 2),
  ('вождение', 'вождение', 2),
  ('фехтование', 'фехт', 2),
  ('пистолет', 'пистол', 2),
  ('тяжелое оружие', 'тяжоруж', 2),
  ('боевые искусства', 'боескус', 2),
  ('ближний бой', 'ближбой', 2),
  ('управление мотоциклом', 'мотоц', 2),
  ('управление тяж. транспортом', 'тяжтранспорт',2),
  ('пилотирование (вертолет)', 'вертолет', 2),
  ('пилотирование (самолет)', 'самолет', 2),
  ('пилотирование (дирижабль)', 'дирижабль', 2),
  ('пилотирование (av/аэродайн)', 'ав', 2),
  ('ружье', 'ружье', 2),
  ('скрытность', 'скрыт', 2),
  ('пистолет-пулемет', 'пп',2);

-- TECH skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('технология (самолет)', 'техсамолет',3),
  ('технология (av/аэродайн)', 'техав',3),
  ('базовая технология', 'базтех',3),
  ('управление криокамерой', 'упркрио',3),
  ('технология (кибердека)', 'техкибдек',3),
  ('кибертехнология', 'кибертех', 3),
  ('взрывчатка', 'взрыв', 3),
  ('маскировка', 'маски', 3),
  ('электроника', 'электро', 3),
  ('электронная эезопасность', 'эбез', 3),
  ('первая помощь', 'перпощ', 3),
  ('подделка', 'поддел', 3),
  ('технология (вертолет)', 'техверт',3),
  ('рисование', 'рисов', 3),
  ('кино-фотосъёмка', 'кинфот', 3),
  ('фармацевтика', 'фармац', 3),
  ('вскрытие замков', 'замков', 3),
  ('кража', 'кража', 3),
  ('игра на инструменте', 'инстр', 3),
  ('технология (оружие)', 'техору', 3);

-- COOL skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('допрос', 'допр', 4),
  ('угрожать/запугивать', 'угроз', 4),
  ('красноречие', 'краснорч', 4),
  ('устойчивость к наркотикам/пыткам', 'устойнаркопыт', 4),
  ('знание улиц', 'знаул', 4);

-- ATTR skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('внешний вид', 'внеш', 5),
  ('гардероб и стиль', 'гардер', 5);

-- EMP skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('понимание людей', 'поним', 6),
  ('интервью', 'интер', 6),
  ('лидерство', 'лидер', 6),
  ('соблазнение', 'собл', 6),
  ('хорошие манеры', 'манер', 6),
  ('убеждать и заговаривать зубы', 'убеждать', 6),
  ('публичные выступления', 'выступ', 6);

-- BODY skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('выносливость', 'вынос',7),
  ('проявление силы', 'проявсил', 7),
  ('плавание', 'плав', 7);

-- role-bound skills
INSERT INTO skills (name, short_name, attribute_id) VALUES
  ('авторитет', 'автрор', NULL),
  ('харизматичное лидерство', 'харлид',NULL),
  ('чувство боя', 'чбоя', NULL),
  ('правдоподобность', 'правдоп', NULL),
  ('семья', 'семья', NULL),
  ('аварийный ремонт', 'аваррем', NULL),
  ('интерфейс', 'интерфей', NULL),
  ('медтехника', 'медтех', NULL),
  ('ресурсы', 'ресур', NULL),
  ('Блат', 'блат', NULL);

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
