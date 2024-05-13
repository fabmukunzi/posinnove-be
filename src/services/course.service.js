import express from 'express';
import Course from "../database/models/course.model"
import { deleteImage } from '../helpers/cloudinary';
export class  courseService{
    static async getCourses(tutorId) { 
        return await Course.findAll({ where: { tutorId: tutorId } }); 
    }
    static async getCourseById(id,tutorId) { 
        return await Course.findOne({where:{id:id,tutorId:tutorId}});
    }
    static async createCourse(newCourse){
        return await Course.create(newCourse);
    }
    static async updateCourse(id, tutorId, updatedCourseData) {
        const existingCourse = await Course.findOne({ where: { id: id, tutorId: tutorId} });
        if (!existingCourse) {
            throw new Error("Course not found");
        }
    
        try {
            const [rowsUpdated, updatedRows] = await Course.update(updatedCourseData, {
                where: { id: id, tutorId: tutorId },
                returning: true,
            });

            if (rowsUpdated === 0) {
                throw new Error("Course not found or not updated");
            }

            return updatedRows[0];
        } catch (error) {
            throw error;
        }
    }

    static async deleteCourse(id, tutorId) {
        const course = await Course.findOne({ where: { id: id, tutorId: tutorId } });
        if (!course) {
            throw new Error('Course not found');
        }

        const imageUrl = course.courseThumbnail;

        await Course.destroy({ where: { id: id, tutorId: tutorId } });

        if (imageUrl) {
            await deleteImage(imageUrl);
            console.log("Course deleted");
        }
    }
}