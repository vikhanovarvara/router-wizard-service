import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

import { FileType } from 'common/types/file';

@Injectable()
export class FileService {
  constructor() {}

  createFile(type: FileType, file: Express.Multer.File): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve('dist', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileWritePath = path.resolve(filePath, fileName);

      fs.writeFileSync(fileWritePath, file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async removeFile(fileName: string) {}
}
