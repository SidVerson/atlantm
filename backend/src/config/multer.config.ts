import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const multerConfig = {
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${uuidv4()}${extname(file.originalname)}`;
      cb(null, filename);
    },
  }),
};
