const express = require('express');

//multer is for saving my uploaded files to server
const multer  = require('multer');
//This is the storage engine defining how and where i want to store my images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
//Setting up upload to have my storage engine in variable for easier typing later
const upload = multer({ storage: storage });
const router = express.Router();
//galleryItems is no longer needed could be deleted
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js')

// DO NOT MODIFY THIS FILE FOR BASE MODE
//POST route fo DB
router.post('/', (req, res) => {
    console.log('In POST', req.body)

    const sqlQuery = `
        INSERT INTO gallery_items
        (path, description)
        VALUES
        ($1, $2);
    `
    const sqlParams = [
        req.body.path,
        req.body.description
    ]

    pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err) => {
            console.log('POST failed', err)
            res.sendStatus(500)
        })

})
//POST route to get my uploaded files to server
router.post('/upload', upload.single('image'), (req, res) => {
    console.log('In POST', req.body)
    console.log('file?', req.file)

    res.sendStatus(200)
})


//DELETE route to send DELETE request to DB
router.delete('/:id', (req, res) => {
    console.log(req.params.id)

    const sqlQuery = `
        DELETE FROM gallery_items
        WHERE id = $1;
    `

    const sqlParams = [
        req.params.id
    ];

    pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('DELETE failed', err);
            res.sendStatus(500);
        })
})


// PUT Route
router.put('/like/:id', (req, res) => {
    console.log(req.params);
    console.log('photo likes', req.body)
    const galleryId = req.params.id;
    let likes = req.body.likes;
    likes += 1;

    const sqlQuery = `
        UPDATE gallery_items
        SET likes = $1
        WHERE id = $2;
    `
    const sqlParams = [
        likes,
        galleryId
    ]

    pool.query(sqlQuery, sqlParams)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log('PUT failed', err)
            res.sendStatus(500)
        })

}); // END PUT Route

// GET Route for getting photo info back to client to render in app
router.get('/', (req, res) => {
    const sqlQuery = `
        SELECT * FROM gallery_items
        ORDER BY id;
    `
    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('GET failed', err)
            res.sendStatus(500)
        })
    
    
}); // END GET Route

module.exports = router;