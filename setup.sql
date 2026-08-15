CREATE DATABASE nodejs;
USE nodejs;

CREATE TABLE tags (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE news (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(150) NOT NULL,
                      content TEXT NOT NULL,
                      author VARCHAR(100) NOT NULL,
                      published_at DATE NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news_tag (
                          news_id INT NOT NULL,
                          tag_id INT NOT NULL,
                          PRIMARY KEY (news_id, tag_id),
                          FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
                          FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

INSERT INTO tags (name) VALUES ('Match'), ('Training'), ('Announcement');

INSERT INTO news (title, content, author, published_at) VALUES
                                                            ('Big win against FC Rivals', 'Our first team won 3-1 in a hard-fought match...', 'Jan Peeters', '2026-08-01'),
                                                            ('New training schedule starting September', 'Starting September 1, new training hours apply...', 'Coach Kim', '2026-08-05'),
                                                            ('New sponsor for the season', 'The club welcomes a new main sponsor...', 'Board', '2026-07-15'),
                                                            ('Annual general meeting on September 20', 'All members are welcome at the annual meeting...', 'Board', '2026-08-10'),
                                                            ('Youth team wins championship', 'Our U15 team has won the provincial championship!', 'Coach Kim', '2026-08-12'),
                                                            ('Clubhouse closed for renovation', 'The clubhouse will be closed from September 1 to 15...', 'Jan Peeters', '2026-08-20');

INSERT INTO news_tag (news_id, tag_id) VALUES (1,1), (2,2), (3,3), (4,3), (5,1), (5,2), (6,3);