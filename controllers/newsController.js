import pool from '../config/db.js';
import { validateNews } from './validators.js';

export const getAllNews = async (req, res) => {
	try {
		let limit = parseInt(req.query.limit) || 10;
		let offset = parseInt(req.query.offset) || 0;

		if (limit > 100) limit = 100;
		if (limit < 1) limit = 10;
		if (offset < 0) offset = 0;

		const [rows] = await pool.query(
			'SELECT * FROM news ORDER BY published_at DESC LIMIT ? OFFSET ?',
			[limit, offset]
		);

		const [countResult] = await pool.query('SELECT COUNT(*) AS total FROM news');

		res.json({
			data: rows,
			total: countResult[0].total,
			limit,
			offset
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const searchNews = async (req, res) => {
	try {
		const { q } = req.query;

		if (!q || q.trim() === '') {
			return res.status(400).json({ error: 'Query parameter "q" is required, e.g. /news/search?q=training' });
		}

		const searchTerm = `%${q}%`;
		const [rows] = await pool.query(
			'SELECT * FROM news WHERE title LIKE ? OR content LIKE ? ORDER BY published_at DESC',
			[searchTerm, searchTerm]
		);

		res.json({ query: q, results: rows.length, data: rows });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getNewsById = async (req, res) => {
	try {
		const { id } = req.params;
		const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);

		if (rows.length === 0) {
			return res.status(404).json({ error: 'News post not found' });
		}

		const [tags] = await pool.query(
			`SELECT t.id, t.name FROM tags t
             JOIN news_tag nt ON nt.tag_id = t.id
             WHERE nt.news_id = ?`,
			[id]
		);

		const news = rows[0];
		news.tags = tags;

		res.json(news);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createNews = async (req, res) => {
	try {
		const { title, content, author, published_at } = req.body;

		const errors = validateNews(req.body);
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		const [result] = await pool.query(
			'INSERT INTO news (title, content, author, published_at) VALUES (?, ?, ?, ?)',
			[title, content, author, published_at]
		);

		res.status(201).json({ id: result.insertId, title, content, author, published_at });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateNews = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content, author, published_at } = req.body;

		const errors = validateNews(req.body);
		if (errors.length > 0) {
			return res.status(400).json({ errors });
		}

		const [result] = await pool.query(
			'UPDATE news SET title = ?, content = ?, author = ?, published_at = ? WHERE id = ?',
			[title, content, author, published_at, id]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'News post not found' });
		}

		res.json({ id, title, content, author, published_at });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteNews = async (req, res) => {
	try {
		const { id } = req.params;
		const [result] = await pool.query('DELETE FROM news WHERE id = ?', [id]);

		if (result.affectedRows === 0) {
			return res.status(404).json({ error: 'News post not found' });
		}

		res.json({ message: 'News post deleted' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};