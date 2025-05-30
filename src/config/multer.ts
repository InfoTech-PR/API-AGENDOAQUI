import multer from 'multer';
import path from 'path';
import { Request } from 'express';

export const createMulter = (folder: string) => {
  const storage = multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
      const dir = path.join('uploads', folder);
      cb(null, dir); 
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  return multer({ storage });
};
