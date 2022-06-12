const express = require('express');
const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage });
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js')

// DO NOT MODIFY THIS FILE FOR BASE MODE
//POST route
router.post('/', upload.single('image'), (req, res) => {
    console.log('In POST', req.body)
    console.log('file?', req.file)

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

// GET Route
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
        })
    
    
}); // END GET Route

module.exports = router;