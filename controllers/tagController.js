import pool from '../config/db.js';
import { validateTag } from './validators.js';

export const getAllTags = async (req, res) => {
	try {
		const sortDirection = req.query.sort === '-name' ? 'DESC' : 'ASC';
		const [rows] = await pool.query(`SELECT * FROM tags ORDER BY name ${sortDirection}`);
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getTagById = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query('SELECT * FROM tags WHERE id = ?', [id]);

		if (rows.length === 0) {
			return res.status(404).json({ error: 'Tag not found' });
		}

		res.json(rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createTag = async (req, res) => {
	try {
		const { name } = req.body;

		const errors = validateTag(req.body);
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		const [result] = await pool.query('INSERT INTO tags (name) VALUES (?)', [name]);
		res.status(201).json({ id: result.insertId, name });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res.status(409).json({ error: 'This tag already exists' });
		}
		res.status(500).json({ error: err.message });
	}
};

export const updateTag = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const errors = validateTag(req.body);
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		const [result] = await pool.query('UPDATE tags SET name = ? WHERE id = ?', [name, id]);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'Tag not found' });
		}

		res.json({ id, name });
	} catch (err) {
		if (err.code === 'ER_DUP_ENTRY') {
			return res.status(409).json({ error: 'This tag already exists' });
		}
		res.status(500).json({ error: err.message });
	}
};

export const deleteTag = async (req, res) => {
	try {
		const { id } = req.params;
		const [result] = await pool.query('DELETE FROM tags WHERE id = ?', [id]);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'Tag not found' });
		}

		res.json({ message: 'Tag deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};