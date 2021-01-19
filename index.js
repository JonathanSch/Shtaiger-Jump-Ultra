require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const routes = require('./routes')

app.use(cors());
app.use(express.json());
app.use('/api',routes);


require('./database')

app.listen(PORT , ()=>console.log(`Server on port ${PORT}`))