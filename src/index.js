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

    app.get('', (req, res) => {
        return res.status(200).send({ status: 'UP' });
    });

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
}

init();