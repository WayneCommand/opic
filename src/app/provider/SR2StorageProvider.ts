import {FileKey, StorageProvider} from '@/app/provider/StorageProvider';
import { generateRandomString, getFileExtension } from '@/app/lib/utils';

// Simple R2 Storage Provider（不需要生成随机文件名）
export default class SR2StorageProvider implements StorageProvider {
  private bucket: R2Bucket;
  constructor(bucket: R2Bucket) {
    this.bucket = bucket;
  }
  async load(key: FileKey): Promise<ReadableStream | Blob | null> {
    const obj = await this.bucket.get(key.path)
    if (!obj) {
      return null;
    }
    return obj.body;
  }

  // 简单存储，文件名就行
  async save(file: ReadableStream | Blob, filename: string): Promise<FileKey> {
    const key = "img/" + filename
    const customMetadata = { "x-amz-meta-filename": filename };
    await this.bucket.put(key, file, { customMetadata });
    return { path: key };
  }
}
