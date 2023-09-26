-- Drop schema if it exists and create a new one named 'quest'
DROP SCHEMA IF EXISTS quest;
CREATE SCHEMA quest;
USE quest;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert a user with id 0
INSERT INTO users (id, name) VALUES (1, 'System Admin');

-- Create quests table
CREATE TABLE quests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    totalCount INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create actions table
CREATE TABLE actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create quest_action_associations table
CREATE TABLE quest_action_associations (
	id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    action_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (quest_id) REFERENCES quests(id),
    FOREIGN KEY (action_id) REFERENCES actions(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE behaviors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE quest_behavior_associations (
	id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    behavior_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (quest_id) REFERENCES quests(id),
    FOREIGN KEY (behavior_id) REFERENCES behaviors(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Create quest_records table
CREATE TABLE quest_instance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  questId INT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  goalType ENUM('frequency', 'count') NOT NULL,
  goalValue INT NOT NULL,
  goalUnit ENUM('week', 'month', 'year') NOT NULL,
  status ENUM('active', 'stopped', 'finished') NOT NULL,
  rewardStatus ENUM('collect', 'issued') NOT NULL,
  createdBy INT,
  privacyOption ENUM(
    'Self', 
    'ParentGuardian', 
    'Child', 
    'Grandchild', 
    'NieceNephew', 
    'Cousin', 
    'Friend', 
    'GrandParent', 
    'UncleAunt', 
    'Educator', 
    'Provider', 
    'Spouse', 
    'Other'
  ) NOT NULL DEFAULT 'Self',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (questId) REFERENCES quests(id),
  FOREIGN KEY (createdBy) REFERENCES users(id)
);

-- Create quest_participants table
CREATE TABLE quest_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    participant_id INT,
    status ENUM('notified', 'accepted', 'denied') NOT NULL,
    performance FLOAT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quest_id) REFERENCES quest_instance(id),
    FOREIGN KEY (participant_id) REFERENCES users(id)
);

-- Create quest_benefactors table
CREATE TABLE quest_benefactors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    benefactor_id INT,
    status ENUM('notified', 'accepted', 'denied') NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quest_id) REFERENCES quest_instance(id),
    FOREIGN KEY (benefactor_id) REFERENCES users(id)
);

-- Create quest_action_checkins table
CREATE TABLE quest_action_checkins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    participant_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quest_id) REFERENCES quest_instance(id),
    FOREIGN KEY (participant_id) REFERENCES users(id)
);

-- Create quest_comments table
CREATE TABLE quest_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    user_id INT,
    comment TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quest_id) REFERENCES quest_instance(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE quest_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quest_id INT,
    action_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (quest_id) REFERENCES quest_instance(id),
    FOREIGN KEY (action_id) REFERENCES actions(id)
);

-- Insert a user with id 1
SELECT * FROM users;

-- Sample data insertion
-- Adding sample data for quests and actions tables (assuming user with id 0 creates them)
INSERT INTO users (name) VALUES ('Lisa');
INSERT INTO users (name) VALUES ('Tom');
INSERT INTO quests (name, description, created_by) VALUES ('Happy', 'This is quest 1 description', 1);
INSERT INTO quests (name, description, created_by) VALUES ('Open', 'This is quest description', 1);
INSERT INTO quests (name, description, created_by) VALUES ('Read', 'This is quest description', 1);
INSERT INTO quests (name, description, created_by) VALUES ('Book', 'This is quest 1 description', 1);
INSERT INTO actions (name, description, created_by) VALUES ('Action 1', 'This is action 1 description', 1);
INSERT INTO actions (name, description, created_by) VALUES ('Action 2', 'This is action 2 description', 1);

