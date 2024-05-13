import Chapters from "../database/models/chapters.model"

export class ChaptersService{
    static async createChapters(newChapter){
        return await Chapters.create(newChapter);
    }
    static async getChaptersByCourseId(courseId){
        return await Chapters.findAll({where:{courseId:courseId}});
    }
    static async getChapterById(id){
        return await Chapters.findOne({where:{id:id}});
    }
    static async updateChapter(id,tutorId,updatedChapter){
        const [updated] = await Chapters.update(updatedChapter, { where: { id: id, tutorId: tutorId } });
        if (updated) {
            return await Chapters.findOne({ where: { id: id, tutorId: tutorId } });
        }
    }
    static async deleteChapter(id,tutorId){
        return await Chapters.destroy({where:{id:id,tutorId:tutorId}});
    }

}