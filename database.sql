-- Database name react_gallery

-- To create your table
CREATE TABLE gallery_items(
id SERIAL PRIMARY KEY,
path VARCHAR(2048),
description VARCHAR(2048),
likes INT);


-- for my sample data
INSERT INTO gallery_items(
path,
description,
likes)
VALUES
('images/goat_small.jpg', 'Photo of a goat taken at Glacier National Park.', 0),
('images/funny_mofi.jpeg', 'My 2 puppers shortly after i left for the cities', 1),
('images/mobitsDopey.jpeg', 'This is Moana early in the morning on our Bearaboo run..', 5),
('images/Mobitsface.jpeg', 'My girl and I getting ready for a photo.', 3),
('images/moyawn.jpeg', 'My bits yawning during early morning belly rubs', 5);