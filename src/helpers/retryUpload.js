import { uploadFile } from './cloudinary';

export const retryUpload = async (filePath, folder, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await uploadFile(filePath, folder);
      return result;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      console.warn(`Upload attempt ${i + 1} failed. Retrying...`, error);
    }
  }
};
