SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

-- Elizabeth char
INSERT INTO characters (name, user_id) VALUES ('Elizabeth', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (7, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (7, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (6, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Elizabeth'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (5, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='образование и общие знания'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (1, (SELECT id FROM skills WHERE name='композиция'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='борьба'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='вождение'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='кино-фотосъёмка'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='знание улиц'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='понимание людей'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (2, (SELECT id FROM skills WHERE name='интервью'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (2, (SELECT id FROM skills WHERE name='хорошие манеры'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='убеждать и заговаривать зубы'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (2, (SELECT id FROM skills WHERE name='итальянский язык'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (3, (SELECT id FROM skills WHERE name='выносливость'), (SELECT id FROM characters WHERE name='Elizabeth')),
  (5, (SELECT id FROM skills WHERE name='правдоподобность'), (SELECT id FROM characters WHERE name='Elizabeth'));

  -- Det. Jim Sandman char
INSERT INTO characters (name, user_id) VALUES ('Det. Jim Sandman', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (7, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (8, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (6, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (4, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (2, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (4, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (6, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (9, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Det. Jim Sandman'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (8, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='образование и общие знания'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='вождение'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (2, (SELECT id FROM skills WHERE name='ближний бой'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='пистолет-пулемет'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='первая помощь'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (2, (SELECT id FROM skills WHERE name='технология (оружие)'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (5, (SELECT id FROM skills WHERE name='допрос'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='знание улиц'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='понимание людей'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (4, (SELECT id FROM skills WHERE name='лидерство'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (8, (SELECT id FROM skills WHERE name='авторитет'), (SELECT id FROM characters WHERE name='Det. Jim Sandman'));

-- Peggy Olsen char
INSERT INTO characters (name, user_id) VALUES ('Peggy Olsen', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (10, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (5, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (4, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (5, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (9, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (3, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (4, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (5, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (7, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Peggy Olsen'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (2, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (4, (SELECT id FROM skills WHERE name='образование и общие знания'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (3, (SELECT id FROM skills WHERE name='использование библиотек'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (4, (SELECT id FROM skills WHERE name='скрытность'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (5, (SELECT id FROM skills WHERE name='пистолет-пулемет'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (3, (SELECT id FROM skills WHERE name='устойчивость к наркотикам/пыткам'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (5, (SELECT id FROM skills WHERE name='гардероб и стиль'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (8, (SELECT id FROM skills WHERE name='понимание людей'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (3, (SELECT id FROM skills WHERE name='хорошие манеры'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (3, (SELECT id FROM skills WHERE name='выносливость'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (9, (SELECT id FROM skills WHERE name='убеждать и заговаривать зубы'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (2, (SELECT id FROM skills WHERE name='китайский язык'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (2, (SELECT id FROM skills WHERE name='русский язык'), (SELECT id FROM characters WHERE name='Peggy Olsen')),
  (9, (SELECT id FROM skills WHERE name='ресурсы'), (SELECT id FROM characters WHERE name='Peggy Olsen'));

-- Jamie char
INSERT INTO characters (name, user_id) VALUES ('Jamie', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (4, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Jamie')),
  (5, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Jamie')),
  (6, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Jamie')),
  (5, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Jamie')),
  (5, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Jamie')),
  (6, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Jamie')),
  (4, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Jamie'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (2, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='русский язык'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM skills WHERE name='борьба'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='пистолет-пулемет'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='базовая технология'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='первая помощь'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM skills WHERE name='игра на инструменте'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM skills WHERE name='угрожать/запугивать'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM skills WHERE name='устойчивость к наркотикам/пыткам'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='знание улиц'), (SELECT id FROM characters WHERE name='Jamie')),
  (5, (SELECT id FROM skills WHERE name='внешний вид'), (SELECT id FROM characters WHERE name='Jamie')),
  (5, (SELECT id FROM skills WHERE name='гардероб и стиль'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='соблазнение'), (SELECT id FROM characters WHERE name='Jamie')),
  (3, (SELECT id FROM skills WHERE name='публичные выступления'), (SELECT id FROM characters WHERE name='Jamie')),
  (2, (SELECT id FROM skills WHERE name='харизматичное лидерство'), (SELECT id FROM characters WHERE name='Jamie'));

-- Толедо char
INSERT INTO characters (name, user_id) VALUES ('Толедо', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (8, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Толедо')),
  (9, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Толедо')),
  (7, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Толедо')),
  (3, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Толедо')),
  (4, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Толедо')),
  (4, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Толедо')),
  (7, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Толедо'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (5, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Толедо')),
  (2, (SELECT id FROM skills WHERE name='японсикй язык'), (SELECT id FROM characters WHERE name='Толедо')),
  (3, (SELECT id FROM skills WHERE name='выживание'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM skills WHERE name='борьба'), (SELECT id FROM characters WHERE name='Толедо')),
  (1, (SELECT id FROM skills WHERE name='вождение'), (SELECT id FROM characters WHERE name='Толедо')),
  (2, (SELECT id FROM skills WHERE name='пистолет'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM skills WHERE name='ближний бой'), (SELECT id FROM characters WHERE name='Толедо')),
  (1, (SELECT id FROM skills WHERE name='управление мотоциклом'), (SELECT id FROM characters WHERE name='Толедо')),
  (1, (SELECT id FROM skills WHERE name='скрытность'), (SELECT id FROM characters WHERE name='Толедо')),
  (1, (SELECT id FROM skills WHERE name='маскировка'), (SELECT id FROM characters WHERE name='Толедо')),
  (3, (SELECT id FROM skills WHERE name='подделка'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM skills WHERE name='вскрытие замков'), (SELECT id FROM characters WHERE name='Толедо')),
  (2, (SELECT id FROM skills WHERE name='кража'), (SELECT id FROM characters WHERE name='Толедо')),
  (3, (SELECT id FROM skills WHERE name='угрожать/запугивать'), (SELECT id FROM characters WHERE name='Толедо')),
  (2, (SELECT id FROM skills WHERE name='понимание людей'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM skills WHERE name='убеждать и заговаривать зубы'), (SELECT id FROM characters WHERE name='Толедо')),
  (2, (SELECT id FROM skills WHERE name='выносливость'), (SELECT id FROM characters WHERE name='Толедо')),
  (5, (SELECT id FROM skills WHERE name='блат'), (SELECT id FROM characters WHERE name='Толедо'));

-- Би-Би char
INSERT INTO characters (name, user_id) VALUES ('Би-Би', NULL);

INSERT INTO char_attrs (attr_value, attribute_id, char_id) VALUES
  (7, (SELECT id FROM attributes WHERE name='INT'), (SELECT id FROM characters WHERE name='Би-Би')),
  (10, (SELECT id FROM attributes WHERE name='REF'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM attributes WHERE name='TECH'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM attributes WHERE name='COOL'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM attributes WHERE name='ATTR'), (SELECT id FROM characters WHERE name='Би-Би')),
  (10, (SELECT id FROM attributes WHERE name='LUCK'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM attributes WHERE name='MA'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM attributes WHERE name='BODY'), (SELECT id FROM characters WHERE name='Би-Би')),
  (4, (SELECT id FROM attributes WHERE name='EMP'), (SELECT id FROM characters WHERE name='Би-Би'));

INSERT INTO char_skills (skill_value, skill_id, char_id) VALUES
  (4, (SELECT id FROM skills WHERE name='замечать/узнавать'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='программирование'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='выживание'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='лук/арбалет'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='атлетика'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='борьба'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='пистолет'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='тяжелое оружие'), (SELECT id FROM characters WHERE name='Би-Би')),
  (6, (SELECT id FROM skills WHERE name='ближний бой'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='ружье'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='скрытность'), (SELECT id FROM characters WHERE name='Би-Би')),
  (4, (SELECT id FROM skills WHERE name='пистолет-пулемет'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='технология (оружие)'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='допрос'), (SELECT id FROM characters WHERE name='Би-Би')),
  (2, (SELECT id FROM skills WHERE name='угрожать/запугивать'), (SELECT id FROM characters WHERE name='Би-Би')),
  (5, (SELECT id FROM skills WHERE name='устойчивость к наркотикам/пыткам'), (SELECT id FROM characters WHERE name='Би-Би')),
  (1, (SELECT id FROM skills WHERE name='знание улиц'), (SELECT id FROM characters WHERE name='Би-Би')),
  (1, (SELECT id FROM skills WHERE name='убеждать и заговаривать зубы'), (SELECT id FROM characters WHERE name='Би-Би')),
  (3, (SELECT id FROM skills WHERE name='выносливость'), (SELECT id FROM characters WHERE name='Би-Би'));
