import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3030;
const host = '0.0.0.0';
const dbPath = path.join(__dirname, 'walking_mate.db');

const db = new Database(dbPath);

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    imageUrl TEXT,
    region TEXT,
    ageGroups TEXT,
    themes TEXT,
    companions TEXT,
    difficulty TEXT,
    duration INTEGER,
    distance REAL,
    lat REAL,
    lng REAL,
    facilities TEXT
  )
`);

app.use(express.json());

// API Endpoints
app.get('/api/courses', (req, res) => {
  const rows = db.prepare('SELECT * FROM courses').all();
  const courses = rows.map((row: any) => ({
    ...row,
    ageGroups: JSON.parse(row.ageGroups),
    themes: JSON.parse(row.themes),
    companions: JSON.parse(row.companions),
    facilities: JSON.parse(row.facilities),
    coordinates: [row.lat, row.lng]
  }));
  res.json(courses);
});

// Serve static files in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(Number(port), host, () => {
  console.log(`Server running at http://${host}:${port}`);
});
