const express = require('express');
const admin = require('./admin.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/register', admin.register);
// router.get('/fetch', client.fetch);
// router.get('/refresh', client.refresh);
// router.get('/authorize', client.authorize);
router.get('/getAll', admin.getAll);
router.delete('/delete/:username', admin.delete);
// router.get('/decryptKey/:key', client.decryptKey);

module.exports = router;