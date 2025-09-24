import express from 'express';
import router  from './routes/index.js';
import cors from 'cors';

const port = process.env.PORT || 1000;

const app = express();
 
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendStatus(200);
})

app.use(router);

app.listen(port, () =>{
    console.log(`Aplicação inicida no endereço http://localhost:${port}/`)
})