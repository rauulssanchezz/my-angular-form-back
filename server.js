const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port =process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');

app.use('/api/users', userRoutes);
app.use('/api/address', addressRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
