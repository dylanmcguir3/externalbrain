import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database,
  });
  const nodes = await db.all('SELECT * FROM nodes');
  res.status(200).json(nodes);
}