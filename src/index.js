const express = require('express');
require('dotenv').config();
const { app: { port } } = require('./config');
const router = require('./router');
const cors = require('cors');

const init = async () => {
    const app = express();
    app.use(express.json())
    app.use(cors());

    app.use(router);

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

init();