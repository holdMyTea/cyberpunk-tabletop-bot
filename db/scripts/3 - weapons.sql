SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

CREATE TABLE weapon_types (
  id INT(3) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  abbr VARCHAR(5) NOT NULL, 
  skill_id INT(4) UNSIGNED,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE SET NULL
);

INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Light Autopistol', 'LP', (SELECT id FROM skills WHERE name = 'пистолет')),
  ('Medium Autopistol', 'MP', (SELECT id FROM skills WHERE name = 'пистолет')),
  ('Heavy Autopistol', 'HP', (SELECT id FROM skills WHERE name = 'пистолет')),
  ('Very Heavy Autopistol', 'VHP', (SELECT id FROM skills WHERE name = 'пистолет'));

CREATE TABLE weapon_reliability (
  id INT(1) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  abbr VARCHAR(2) NOT NULL
);

INSERT INTO weapon_reliability(name, abbr) VALUES
  ('Very Reliable', 'VR'),
  ('Standard', 'ST'),
  ('Unreliable', 'UR');

CREATE TABLE weapons (
  id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,
  weapon_type_id INT(3) UNSIGNED,
  FOREIGN KEY (weapon_type_id) REFERENCES weapon_types(id) ON DELETE SET NULL,
  accuracy INT(1) NOT NULL,
  damage VARCHAR(15) NOT NULL,
  number_of_shots INT(3) NOT NULL,
  rate_of_fire INT(3) NOT NULL,
  reliability_id INT(1) UNSIGNED,
  FOREIGN KEY (reliability_id) REFERENCES weapon_reliability(id) ON DELETE SET NULL,
  weapon_range VARCHAR(20) NOT NULL
);

INSERT INTO weapons (
  name, 
  weapon_type_id, 
  accuracy,
  damage, 
  number_of_shots, 
  rate_of_fire, 
  reliability_id,
  weapon_range
  ) VALUES (
    'BudgetArms C-13',
    (SELECT id FROM weapon_types WHERE name = 'Light Autopistol'),
    -1,
    '1D6',
    8,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  ), (
    'Dai Lung Cybermag 15',
    (SELECT id FROM weapon_types WHERE name = 'Light Autopistol'),
    -1,
    '1D6+1',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'UR'),
    '50m'
  ), (
    'Federated Arms X-22',
    (SELECT id FROM weapon_types WHERE name = 'Light Autopistol'),
    0,
    '1D6+1',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  );
