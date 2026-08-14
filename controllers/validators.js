export const validateNews = (data) => {
	const errors = [];
	const { title, content, author, published_at } = data;

	if (!title || title.trim() === '') errors.push('title is required');
	if (!content || content.trim() === '') errors.push('content is required');
	if (!author || author.trim() === '') errors.push('author is required');
	if (!published_at || published_at.trim() === '') errors.push('published_at is required');

	if (author && /\d/.test(author)) {
		errors.push('author cannot contain digits');
	}

	if (title && title.trim().length < 5) {
		errors.push('title must be at least 5 characters');
	}

	if (published_at && !/^\d{4}-\d{2}-\d{2}$/.test(published_at)) {
		errors.push('published_at must use the format YYYY-MM-DD');
	}

	return errors;
};

export const validateTag = (data) => {
	const errors = [];
	const { name } = data;

	if (!name || name.trim() === '') {
		errors.push('name is required');
	}

	if (name && /\d/.test(name)) {
		errors.push('name cannot contain digits');
	}

	if (name && !isNaN(name) && name.trim() !== '') {
		errors.push('name cannot be a purely numeric value');
	}

	return errors;
};