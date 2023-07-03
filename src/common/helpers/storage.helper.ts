import * as fs from 'fs';
import { promisify } from 'util';

export const checkIfFileOrDirectoryExists = (path: string): boolean =>
  fs.existsSync(path);

export const getFile = async (
  path: string,
  encoding: string,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  const encode = encoding || 'utf-8';
  return readFile(path, { encoding: encode as BufferEncoding });
};

export const createFile = async (
  path: string,
  fileName: string,
  data: any,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};
