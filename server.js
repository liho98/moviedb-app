"use strict";
const express = require('express');
const app = express();
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

app.use(router)

// handle production
//if (process.env.NODE_ENV.trim() === 'production') {
// static folder
app.use(express.static(__dirname + '/dist/'));

// handle SPA
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'));
//}

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8121;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})