import pool from "../configs/connectBD.js";

const getAllbooks = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM books');
    return res.status(200).json(rows);
}

const createNewBook = async (req, res) => {
    // console.log("check: ", req.file);
    const Img = req.file.filename;
    let {title, desc, price} = req.body;

    await pool.execute("INSERT INTO books(`title`, `desc`, `cover`, `price`) values(?, ?, ?, ?)", [title, desc, Img, price]);

    return res.status(200).json({
        message: 'Added a book!'
    });
}

const updateBook = async (req, res) => {
    let id = req.params.id;
    const Img = req.file;
    let {title, desc, price} = req.body;
    
    if(Img) {
        await pool.execute("UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ? WHERE id = ?", [title, desc, Img.filename, price, id]);
    } else {
        await pool.execute("UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?", [title, desc, price, id]);
    }

    return res.status(200).json({
        message: 'Updated a book!'
    });
}

const deleteBook = async (req, res) => {
    let id = req.params.id;
    await pool.execute('DELETE FROM books WHERE id = ?', [id]);

    return res.status(200).json({
        message: `Deleted a book`
    });
}

export {getAllbooks, createNewBook, updateBook, deleteBook};