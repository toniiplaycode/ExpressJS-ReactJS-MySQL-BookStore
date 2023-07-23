import express from 'express';
import initAPIRoute from './routes/api.js';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.static('./src/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// có 2 middleware trên để có thể gửi dữ liệu lên server

app.use(cors());
// dùng middleware cors để bên front-end có thể fetch được data

initAPIRoute(app);

app.listen(8800, () => {
    console.log('server running in port 8800!');
})