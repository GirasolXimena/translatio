const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {

});

/**
 * POST route template
 */
router.post('/request', (req, res) => {
    console.log('translation request', req.body);
    translationInfo = req.body;
    const queryText = `
    INSERT INTO "Translation_request"
    ("business id", "text", "trans_src_lang", "trans_targ_lang")
    VALUES ($1, $2, $3, $4)`
    pool.query(queryText, [translationInfo.business_id, translationInfo.text, translationInfo.trans_src_lang, translationInfo.trans_targ_lang])
    .then(res.sendStatus(201))

});

module.exports = router;