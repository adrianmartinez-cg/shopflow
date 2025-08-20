import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/globals';

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => {
        const randomHexStr = crypto.randomBytes(8).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${randomHexStr}${ext}`);
    },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'));
    }
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024
export const MAX_NUM_FILES = 10
export const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: MAX_NUM_FILES,
    },
    fileFilter,
});

export const uploadHandler = (req: Request, res: Response, next: NextFunction) => {
    upload.array('images')(req, res, (error: any) => {
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: error.code, message: error.message });
        } else if (error) {
            return res.status(500).json({ error: INTERNAL_SERVER_ERROR, message: error.message });
        }
        next();
    });
};