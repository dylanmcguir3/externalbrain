import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Connect to or create a SQLite database file
    const db = await open({
      filename: './mydatabase.db',
      driver: sqlite3.Database,
    });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS sources (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
      )
    `);

    await db.close();

    res.status(200).json({ message: 'Database initialized successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while initializing the database.' });
  }
};