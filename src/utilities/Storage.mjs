import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AppError from '../models/error/appError.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __srcdir = path.resolve(__dirname, '..');


export default class Storage {

  #filePath = undefined;
  #folderPath = undefined;

  constructor(folder, filename) {

    this.#folderPath = path.join(__srcdir, folder);
    this.#filePath = path.join(__srcdir, folder, filename);

  }


  async readFromFile() {

    try {

      const content = await fs.readFile(this.#filePath, 'utf-8');

      return JSON.parse(content);

    } catch (error) {

      if (error.code === 'ENOENT') {

        await this.writeToFile(JSON.stringify([]));

        return [];

      }


      throw new AppError(error, 500);

    }
  }


  async writeToFile(data) {

    try {

      await fs.mkdir(this.#folderPath, { recursive: true });
      await fs.writeFile(this.#filePath, data, 'utf-8');

    } catch (error) {

      throw new AppError(error, 500);
      
    }
  }

}