import createMulterInstance from '../helpers/multer';
import Course from '../database/models/course.model';
import Chapters from '../database/models/chapters.model';
import { uploadImage, deleteImage } from '../helpers/cloudinary';
import cloudinary from 'cloudinary';


const multer = createMulterInstance('chapters-Images');
const uploadMultipleImages = multer.array('chapterImages', 8);

export const createChapters = async (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    try {
        uploadMultipleImages(req, res, async (err) => {
            try {
                if (err) {
                    throw new Error(err.message);
                }

                const { title, description, contents } = req.body;

                if (!req.files || req.files.length === 0) {
                    return res.status(400).json({ message: 'No images uploaded' });
                }

                if (req.files.length > 4) {
                    return res.status(400).json({ message: 'Maximum of 4 images allowed' });
                }

                const urls = [];
                const images = req.files;
                const multiplePicturePromise = images.map((picture) =>
                    cloudinary.uploader.upload(picture.path, { folder: "chaptersImages" })
                );

                const imageResponses = await Promise.all(multiplePicturePromise);
                imageResponses.forEach((img) => {
                    const data = {
                        url: img.secure_url,
                        imgId: img.asset_id
                    };
                    urls.push(data);
                });

                const newChapter = await Chapters.create({
                    courseId,
                    title,
                    description,
                    chaptersImages: urls, 
                    contents,
                    chaptersThumbnails: urls[0].url, 
                    
                });

                return res.status(201).json({ message: 'Chapter created successfully', chapter: newChapter });
            } catch (error) {
                console.error('Error creating chapter:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    } catch (error) {
       
        return res.status(500).json({ message: 'Internal server error' });
    }
};
export  const getAllCourseChapters = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const chapters = await Chapters.findAll({
            where: {
                courseId
            }
        });
        return res.status(200).json({ message: 'Chapters retrieved successfully', chapters: chapters });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }


};

export const getChapterById = async (req, res) => {
    const { id } = req.params;
    try {
        const chapter = await Chapters.findByPk(id);
        return res.status(200).json({ message: 'Chapter retrieved successfully', chapter: chapter });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}

export const updateChapter = async (req, res) => {

    const { id } = req.params;
    try {
        const chapter = await Chapters.findByPk(id);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        const { title, description, contents } = req.body;
        const updatedChapter = await chapter.update({
            title,
            description,
            contents
        });
        return res.status(200).json({ message: 'Chapter updated successfully', chapter: updatedChapter });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}

export const deleteChapter = async (req, res) => {
    const { id } = req.params;
    try {
        const chapter = await Chapters.findByPk(id);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }
        await chapter.destroy();
        return res.status(200).json({ message: 'Chapter deleted successfully' });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
}