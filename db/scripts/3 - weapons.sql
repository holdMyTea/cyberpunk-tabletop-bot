SET NAMES 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci';

CREATE TABLE weapon_types (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  abbr VARCHAR(5) NOT NULL, 
  skill_id INT UNSIGNED,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE SET NULL
);

CREATE TABLE weapon_reliability (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20) NOT NULL,
  abbr VARCHAR(2) NOT NULL
);

INSERT INTO weapon_reliability(name, abbr) VALUES
  ('Very Reliable', 'VR'),
  ('Standard', 'ST'),
  ('Unreliable', 'UR');

CREATE TABLE weapons (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(40) NOT NULL UNIQUE,
  weapon_type_id INT UNSIGNED,
  FOREIGN KEY (weapon_type_id) REFERENCES weapon_types(id) ON DELETE SET NULL,
  accuracy INT NOT NULL,
  damage VARCHAR(15) NOT NULL,
  number_of_shots INT NOT NULL,
  rate_of_fire INT NOT NULL,
  reliability_id INT UNSIGNED,
  FOREIGN KEY (reliability_id) REFERENCES weapon_reliability(id) ON DELETE SET NULL,
  weapon_range VARCHAR(20) NOT NULL
);

CREATE TABLE equipped_weapons (
  char_id INT UNSIGNED UNIQUE,
  FOREIGN KEY (char_id) REFERENCES characters(id) ON DELETE SET NULL,
  weapon_id INT UNSIGNED,
  FOREIGN KEY (weapon_id) REFERENCES weapons(id) ON DELETE SET NULL
);

-- Light Autopistols
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Light Autopistol', 'LP', (SELECT id FROM skills WHERE name = 'пистолет'));

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
    (SELECT id FROM weapon_types WHERE abbr = 'LP'),
    -1,
    '1D6',
    8,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  ), (
    'Dai Lung Cybermag 15',
    (SELECT id FROM weapon_types WHERE abbr = 'LP'),
    -1,
    '1D6+1',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'UR'),
    '50m'
  ), (
    'Federated Arms X-22',
    (SELECT id FROM weapon_types WHERE abbr = 'LP'),
    0,
    '1D6+1',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  );

-- Medium autopistols
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Medium Autopistol', 'MP', (SELECT id FROM skills WHERE name = 'пистолет'));

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
    'Militech Arms Avenger',
    (SELECT id FROM weapon_types WHERE abbr = 'MP'),
    0,
    '2D6+1',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '50m'
  ), (
    'Dai Lung Streetmaster',
    (SELECT id FROM weapon_types WHERE abbr = 'MP'),
    0,
    '2D6+3',
    12,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'UR'),
    '50m'
  ), (
    'Federated Arms X-9mm',
    (SELECT id FROM weapon_types WHERE abbr = 'MP'),
    0,
    '2D6+1',
    12,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  );

-- Heavy Autopistols
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Heavy Autopistol', 'HP', (SELECT id FROM skills WHERE name = 'пистолет'));

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
    'BudgetArms Auto 3',
    (SELECT id FROM weapon_types WHERE abbr = 'HP'),
    -1,
    '3D6',
    8,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'UR'),
    '50m'
  ), (
    'Sternmeyer Type 35',
    (SELECT id FROM weapon_types WHERE abbr = 'HP'),
    0,
    '3D6',
    8,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '50m'
  );

-- Very Heavy Autopistols
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Very Heavy Autopistol', 'VHP', (SELECT id FROM skills WHERE name = 'пистолет'));

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
    'Armalite 44',
    (SELECT id FROM weapon_types WHERE abbr = 'VHP'),
    0,
    '4D6+1',
    8,
    1,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  ), (
    'Colt AMT Model 2000',
    (SELECT id FROM weapon_types WHERE abbr = 'VHP'),
    0,
    '4D6+1',
    8,
    1,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '50m'
  );

-- Light Submachineguns
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Light Submachinegun', 'LSMG', (SELECT id FROM skills WHERE short_name = 'пп'));

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
    'Uzi Miniauto 9',
    (SELECT id FROM weapon_types WHERE abbr = 'LSMG'),
    1,
    '2D6+1',
    30,
    35,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '150m'
  ), (
    'H&K MP-2013',
    (SELECT id FROM weapon_types WHERE abbr = 'LSMG'),
    1,
    '2D6+3',
    35,
    32,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '150m'
  ), (
    'Fed. Arms Tech Assult II',
    (SELECT id FROM weapon_types WHERE abbr = 'LSMG'),
    1,
    '1D6+1',
    50,
    25,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '150m'
  );

-- Medium Submachineguns
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Medium Submachinegun', 'MSMG', (SELECT id FROM skills WHERE short_name = 'пп'));

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
    'Arasaka Miniami 10',
    (SELECT id FROM weapon_types WHERE abbr = 'MSMG'),
    0,
    '2D6+3',
    40,
    20,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '200m'
  ), (
    'H&K MPK-9',
    (SELECT id FROM weapon_types WHERE abbr = 'MSMG'),
    1,
    '2D6+1',
    35,
    25,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '200m'
  );

-- Heavy Submachineguns
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Heavy Submachinegun', 'HSMG', (SELECT id FROM skills WHERE short_name = 'пп'));

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
    'Sternmeyer SMG 21',
    (SELECT id FROM weapon_types WHERE abbr = 'HSMG'),
    -1,
    '3D6',
    30,
    15,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '200m'
  ), (
    'H&K MPK-11',
    (SELECT id FROM weapon_types WHERE abbr = 'HSMG'),
    0,
    '4D6+1',
    30,
    20,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '200m'
  ), (
    'Ingram MAC 14',
    (SELECT id FROM weapon_types WHERE abbr = 'HSMG'),
    -2,
    '4D6+1',
    20,
    10,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '200m'
  );

-- Assault Rifles
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Assault Rifle', 'RIF', (SELECT id FROM skills WHERE short_name = 'ружье'));

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
    'Militech Ronin Light Assault',
    (SELECT id FROM weapon_types WHERE abbr = 'RIF'),
    -1,
    '5D6',
    35,
    30,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '400m'
  ), (
    'AKR-20 Medium Assault',
    (SELECT id FROM weapon_types WHERE abbr = 'RIF'),
    0,
    '5D6',
    30,
    30,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '400m'
  ), (
    'FN-RAL Heavy Assault Rifle',
    (SELECT id FROM weapon_types WHERE abbr = 'RIF'),
    -1,
    '6D6+2',
    30,
    30,
    (SELECT id FROM weapon_reliability WHERE abbr = 'VR'),
    '400m'
  ), (
    'Kalashnikov A-80 Hvy. Rifle',
    (SELECT id FROM weapon_types WHERE abbr = 'RIF'),
    -1,
    '6D6+2',
    35,
    25,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '400m'
  );

  -- Shotguns
INSERT INTO weapon_types (name, abbr, skill_id) VALUES
  ('Shotgun', 'SHT', (SELECT id FROM skills WHERE short_name = 'ружье'));

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
    'Arasaka Rapid Assault 12',
    (SELECT id FROM weapon_types WHERE abbr = 'SHT'),
    1,
    '4D6',
    20,
    10,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  ), (
    'Sternmeyer Stakeout 10',
    (SELECT id FROM weapon_types WHERE abbr = 'SHT'),
    -2,
    '4D6',
    10,
    2,
    (SELECT id FROM weapon_reliability WHERE abbr = 'ST'),
    '50m'
  );
