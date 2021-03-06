import Users from '../../../models/Users';
import dbConnect from '../../../database/db-connect';
import { Request, Response } from 'express';

interface data {
  id: string;
}

async function saveToDb(data: data) {
  if (!data || !data.id) return;

  const id = data.id;
  const category = Object.keys(data).filter(key => {
    if (key !== 'id') return key;
  })[0];
  
  await dbConnect();

  try {
    const doc = await Users.findById({_id: id});
    await doc.updateOne({
      [category]: data[category],
    });

  } catch (error) {
    console.log(error.message);
  }
}

export default (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: req.body });
  saveToDb(req.body);
}