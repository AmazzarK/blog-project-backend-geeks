const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/user.controller');
// LOGIN user
router.post('/login', loginUser);


// POST a new user
router.post('/create-user', createUser);

module.exports = router;
