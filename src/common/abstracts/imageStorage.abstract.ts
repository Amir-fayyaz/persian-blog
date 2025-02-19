export abstract class StorageService {
  abstract uploadFile(file: Express.Multer.File, path: string);
  abstract deleteFile(name: string, path: string): Promise<void>;
}
