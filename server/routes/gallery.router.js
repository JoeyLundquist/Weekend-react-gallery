const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');
const pool = require('../modules/pool.js')

// DO NOT MODIFY THIS FILE FOR BASE MODE
//POST route
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