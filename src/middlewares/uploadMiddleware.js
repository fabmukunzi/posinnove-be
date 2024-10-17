import createMulterInstance from '../helpers/multer';

const upload = createMulterInstance();

export const uploadMiddleware = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'uploads', maxCount: 2 },
  { name: 'profileImage', maxCount: 1 },
  { name: 'userCoverImage', maxCount: 1 }
]);
