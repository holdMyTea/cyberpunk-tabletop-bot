SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

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
  (8, (SELECT id FROM skills WHERE name='Замечать/Узнавать'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='Образование и Общие знания'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='Вождение'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (2, (SELECT id FROM skills WHERE name='Ближний Бой'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='Пистолет-Пулемет'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (3, (SELECT id FROM skills WHERE name='Первая Помощь'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (2, (SELECT id FROM skills WHERE name='Технология (Оружие)'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (5, (SELECT id FROM skills WHERE name='Допрос'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='Знание Улиц'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (7, (SELECT id FROM skills WHERE name='Понимание Людей'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (4, (SELECT id FROM skills WHERE name='Лидерство'), (SELECT id FROM characters WHERE name='Det. Jim Sandman')),
  (8, (SELECT id FROM skills WHERE name='Авторитет'), (SELECT id FROM characters WHERE name='Det. Jim Sandman'));
