import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes.js';
import tagRoutes from './routes/tagRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // laat toe om JSON in de request body te lezen

// Root route -> documentatiepagina
app.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sportclub API - Documentatie</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Teko:wght@500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
    :root {
        --bg: #0C1F17;
        --bg-card: #12291F;
        --bg-card-hover: #16311F;
        --line: rgba(243,241,231,0.12);
        --ink: #F3F1E7;
        --muted: #8FA99B;
        --accent: #F2B705;
        --get: #5FCB8A;
        --post: #4EA1F0;
        --put: #F2B705;
        --delete: #E5766B;
        --get-bg: rgba(95,203,138,0.14);
        --post-bg: rgba(78,161,240,0.14);
        --put-bg: rgba(242,183,5,0.14);
        --delete-bg: rgba(229,118,107,0.14);
    }
    * { box-sizing: border-box; }
    body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: 'Inter', system-ui, sans-serif;
        line-height: 1.6;
    }
    header {
        border-bottom: 1px solid var(--line);
        padding: 2.5rem 2rem 2rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .brand h1 {
        font-family: 'Teko', sans-serif;
        font-weight: 600;
        font-size: 3.2rem;
        letter-spacing: 0.02em;
        margin: 0;
        line-height: 1;
        text-transform: uppercase;
    }
    .brand p {
        margin: 0.4rem 0 0;
        color: var(--muted);
        font-size: 0.95rem;
        max-width: 46ch;
    }
    .status {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
        color: var(--muted);
        background: var(--bg-card);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 0.5rem 1rem;
    }
    .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--get);
        box-shadow: 0 0 0 0 rgba(95,203,138,0.6);
        animation: pulse 2s infinite;
    }
    @keyframes pulse {
        0%   { box-shadow: 0 0 0 0 rgba(95,203,138,0.55); }
        70%  { box-shadow: 0 0 0 7px rgba(95,203,138,0); }
        100% { box-shadow: 0 0 0 0 rgba(95,203,138,0); }
    }
    main {
        max-width: 880px;
        margin: 0 auto;
        padding: 2.5rem 2rem 4rem;
    }
    .eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--accent);
        margin: 0 0 0.5rem;
    }
    h2.section-title {
        font-family: 'Teko', sans-serif;
        font-weight: 600;
        font-size: 2rem;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin: 2.5rem 0 1rem;
        border-bottom: 1px solid var(--line);
        padding-bottom: 0.5rem;
    }
    .endpoint {
        background: var(--bg-card);
        border: 1px solid var(--line);
        border-radius: 8px;
        margin-bottom: 0.6rem;
        overflow: hidden;
    }
    .endpoint summary {
        list-style: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.9rem;
        padding: 0.85rem 1.1rem;
    }
    .endpoint summary::-webkit-details-marker { display: none; }
    .endpoint[open] summary { border-bottom: 1px solid var(--line); }
    .endpoint summary:hover { background: var(--bg-card-hover); }
    .method {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 500;
        font-size: 0.72rem;
        letter-spacing: 0.04em;
        padding: 0.28rem 0.55rem;
        border-radius: 4px;
        min-width: 58px;
        text-align: center;
        flex-shrink: 0;
    }
    .method.get    { color: var(--get);    background: var(--get-bg); }
    .method.post   { color: var(--post);   background: var(--post-bg); }
    .method.put    { color: var(--put);    background: var(--put-bg); }
    .method.delete { color: var(--delete); background: var(--delete-bg); }
    .path {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        color: var(--ink);
    }
    .desc {
        color: var(--muted);
        font-size: 0.88rem;
        margin-left: auto;
        text-align: right;
    }
    .chev {
        color: var(--muted);
        transition: transform 0.15s ease;
        flex-shrink: 0;
    }
    .endpoint[open] .chev { transform: rotate(90deg); }
    .detail {
        padding: 1rem 1.1rem 1.2rem;
        font-size: 0.88rem;
        color: var(--muted);
    }
    .detail code {
        font-family: 'JetBrains Mono', monospace;
        background: rgba(243,241,231,0.08);
        color: var(--ink);
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        font-size: 0.85rem;
    }
    .detail dl {
        margin: 0.6rem 0 0;
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.4rem 1rem;
    }
    .detail dt { color: var(--ink); font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; }
    .detail dd { margin: 0; }
    ul.rules { margin: 0; padding-left: 1.2rem; }
    ul.rules li { margin-bottom: 0.4rem; }
    footer {
        border-top: 1px solid var(--line);
        padding: 1.5rem 2rem;
        text-align: center;
        color: var(--muted);
        font-size: 0.82rem;
        font-family: 'JetBrains Mono', monospace;
    }
    @media (max-width: 560px) {
        .desc { display: none; }
        .brand h1 { font-size: 2.4rem; }
    }
</style>
</head>
<body>

<header>
    <div class="brand">
        <h1>Sportclub API</h1>
        <p>Data-driven REST API voor de sportclub: nieuwsberichten en tags, opgebouwd met Node.js, Express en MySQL.</p>
    </div>
    <div class="status"><span class="dot"></span> API online &middot; poort ${PORT || 3000}</div>
</header>

<main>
    <p class="eyebrow">Resource</p>
    <h2 class="section-title">News</h2>

    <details class="endpoint" open>
        <summary>
            <span class="method get">GET</span>
            <span class="path">/news</span>
            <span class="desc">Alle nieuwsberichten, met paginering</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Geeft een lijst van nieuwsberichten terug, standaard de 10 meest recente.</p>
            <dl>
                <dt>limit</dt><dd>query param, optioneel, default 10, max 100</dd>
                <dt>offset</dt><dd>query param, optioneel, default 0</dd>
            </dl>
            <p style="margin-top:0.8rem">Voorbeeld: <code>/news?limit=2&offset=0</code></p>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method get">GET</span>
            <span class="path">/news/search</span>
            <span class="desc">Zoeken in titel en inhoud</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Zoekt in zowel <code>title</code> als <code>content</code> (case-insensitive).</p>
            <dl>
                <dt>q</dt><dd>query param, verplicht</dd>
            </dl>
            <p style="margin-top:0.8rem">Voorbeeld: <code>/news/search?q=training</code></p>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method get">GET</span>
            <span class="path">/news/:id</span>
            <span class="desc">Eén nieuwsbericht, inclusief tags</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Geeft één nieuwsbericht terug, met de gekoppelde tags via de <code>news_tag</code> koppeltabel.</p>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method post">POST</span>
            <span class="path">/news</span>
            <span class="desc">Nieuw nieuwsbericht toevoegen</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Body (JSON):</p>
            <dl>
                <dt>title</dt><dd>verplicht, minstens 5 karakters</dd>
                <dt>content</dt><dd>verplicht</dd>
                <dt>author</dt><dd>verplicht, mag geen cijfers bevatten</dd>
                <dt>published_at</dt><dd>verplicht, formaat YYYY-MM-DD</dd>
            </dl>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method put">PUT</span>
            <span class="path">/news/:id</span>
            <span class="desc">Nieuwsbericht updaten</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Body (JSON): zelfde velden en validatie als <code>POST /news</code>.</p>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method delete">DELETE</span>
            <span class="path">/news/:id</span>
            <span class="desc">Nieuwsbericht verwijderen</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Verwijdert het nieuwsbericht (en de koppelingen naar tags, via <code>ON DELETE CASCADE</code>).</p>
        </div>
    </details>

    <p class="eyebrow" style="margin-top:2.5rem">Resource</p>
    <h2 class="section-title">Tags</h2>

    <details class="endpoint">
        <summary>
            <span class="method get">GET</span>
            <span class="path">/tags</span>
            <span class="desc">Alle tags</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail"><p>Geeft alle tags terug, alfabetisch gesorteerd.</p></div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method get">GET</span>
            <span class="path">/tags/:id</span>
            <span class="desc">Eén tag</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail"><p>Geeft één tag terug op basis van id.</p></div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method post">POST</span>
            <span class="path">/tags</span>
            <span class="desc">Nieuwe tag toevoegen</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail">
            <p>Body (JSON):</p>
            <dl>
                <dt>name</dt><dd>verplicht, geen cijfers, moet uniek zijn</dd>
            </dl>
        </div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method put">PUT</span>
            <span class="path">/tags/:id</span>
            <span class="desc">Tag updaten</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail"><p>Body (JSON): zelfde velden en validatie als <code>POST /tags</code>.</p></div>
    </details>

    <details class="endpoint">
        <summary>
            <span class="method delete">DELETE</span>
            <span class="path">/tags/:id</span>
            <span class="desc">Tag verwijderen</span>
            <span class="chev">&#9656;</span>
        </summary>
        <div class="detail"><p>Verwijdert de tag (en de koppelingen naar nieuwsberichten).</p></div>
    </details>

    <p class="eyebrow" style="margin-top:2.5rem">Regels</p>
    <h2 class="section-title">Validatie</h2>
    <ul class="rules">
        <li>News: <code>title</code>, <code>content</code>, <code>author</code> en <code>published_at</code> zijn verplicht. <code>author</code> mag geen cijfers bevatten. <code>title</code> moet minstens 5 karakters lang zijn. <code>published_at</code> moet het formaat YYYY-MM-DD hebben.</li>
        <li>Tag: <code>name</code> is verplicht, mag geen cijfers bevatten en mag niet al bestaan.</li>
    </ul>
</main>

<footer>Sportclub API</footer>

</body>
</html>
    `);
});

app.use('/news', newsRoutes);
app.use('/tags', tagRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server draait op http://localhost:${PORT}`);
});