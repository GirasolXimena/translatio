const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) =>{
    console.log('getting languages');
    
    const queryText = `
    SELECT * FROM "Languages"
    `;
    pool.query(queryText)
    .then(result => res.send(result.rows))
    .catch(err => res.send(err))
});

module.exports = router;