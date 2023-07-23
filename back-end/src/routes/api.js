import express from 'express';
import multer from 'multer';
import path from 'path';
import appRoot from 'app-root-path' 
import { getAllbooks, createNewBook, updateBook, deleteBook } from '../controller/apiController.js';

let router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + '/src/public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({ storage: storage });

const initAPIRoute = (app) => {
    router.get('/books', getAllbooks);
    router.post('/create-book', upload.single('cover'), createNewBook);
    router.put('/update-book/:id', upload.single('cover'), updateBook);
    router.delete('/delete-book/:id', deleteBook);

    return app.use('/', router);
}

export default initAPIRoute;