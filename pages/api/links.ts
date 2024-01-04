import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const db = await open({
        filename: './mydatabase.db',
        driver: sqlite3.Database,
      });

      const links = await db.all('SELECT * FROM sources');
      await db.close();

      res.status(200).json(links);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while fetching the links.' });
    }
  } else if (req.method === 'POST') {
    const { url } = req.body;

    try {
      const db = await open({
        filename: './mydatabase.db',
        driver: sqlite3.Database,
      });

      const { lastID } = await db.run('INSERT INTO sources (link, comments) VALUES (?, ?)', [url, JSON.stringify([])]);
      await db.close();

      res.status(201).json({ id: lastID, url, comments: [] });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while adding the link.' });
    }
  }
}