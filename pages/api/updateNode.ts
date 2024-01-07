import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, type, x, y, text } = req.body;
    console.log(req.body);
    const db = await open({
      filename: './mydatabase.db',
      driver: sqlite3.Database,
    });

    const node = await db.get('SELECT * FROM nodes WHERE id = ?', id);
    console.log(node, "node");
    if (node) {
      await db.run('UPDATE nodes SET x = ?, y = ?, text = ? WHERE id = ?', [x, y, text, id]);
    } else {
      await db.run('INSERT INTO nodes (id, type, x, y, text) VALUES (?, ?, ?, ?, ?)', [id, type, x, y, text]);
    }
    res.status(200).json({ message: 'Node position updated' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}