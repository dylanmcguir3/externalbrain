// pages/api/clearDatabase.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await open({
      filename: './mydatabase.db',
      driver: sqlite3.Database,
    });

    await db.exec('DELETE FROM nodes');

    await db.close();

    res.status(200).json({ message: 'Database cleared successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while clearing the database.' });
  }
};