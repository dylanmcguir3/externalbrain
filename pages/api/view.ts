import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const db = await open({
      filename: './mydatabase.db',
      driver: sqlite3.Database,
    });
    const schema = await db.all('PRAGMA table_info(nodes)');
    res.status(200).json(schema);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}