const express = require('express');
const app = express();
const cors = require('cors');

const routes = require('./routes')

app.use(cors());
app.use(express.json());
app.use('/api',routes);


require('./database')

app.listen(process.env.PORT || 3000 , ()=>console.log(`Server open`))