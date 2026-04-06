import express from 'express';
import db from '../db.js'

const router = express.Router();

router.post('/', (req, res) => {
    const { content } = req.body;
    const insertNote = db.prepare(`INSERT INTO notes (content, user_id) VALUES (?,?)`)
    const result = insertNote.run(content, req.id)

    res.json({ id: result.lastInsertRowid, content: content, })
});

router.get('/', (req, res) => {
    const getNotes = db.prepare(`SELECT * FROM notes WHERE user_id = ?`)
    const notes = getNotes.all(req.id)

    res.json(notes)
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    const deleteNotes = db.prepare(`DELETE FROM notes WHERE id = ?`)
    deleteNotes.run(id)

    res.send(`Note with ID: ${id} was deleted successfully`)
})

router.put('/:id', (req,res) => {
    const { id } = req.params;
    const { content } = req.body
    const replaceNoteContent = db.prepare(`UPDATE notes SET content = ? WHERE id = ?`)
    const result = replaceNoteContent.run(content, id)

    res.json({ id: id, content: content, })
})

export default router