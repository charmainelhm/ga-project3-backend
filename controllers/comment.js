import Comment from '../models/Comment.js';
import Video from '../models/Video.js';

export const addComment = async(req, res, next)=>{
    const newComment = new Comment({...req.bidy, userId:req.user.id})
    try{
        const savedComment = await Comment.save()
        res.status(200).send(savedComment)
    }catch(err){
        next(err)
    }
}

export const deleteComment = async(req, res, next)=>{
    try{
        const comment = await Comment.findbyId(res.params.id)
        const video = await Video.findbyId(res.params.id)
    }catch(err){
        next(err)
    }
}

export const getComments = async(req, res, next)=>{
    try{

    }catch(err){
        next(err)
    }
}