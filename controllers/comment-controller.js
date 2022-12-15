const { createError } = require( '../utils/error.js');
const { Comment} = require('../models/');
const { Video } = require('../models/');

const addComment = async(req, res, next)=>{
    const newComment = new Comment({...req.body, userId:req.user.id})
    try{
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    }catch(err){
        next(err)
    }
}

const deleteComment = async(req, res, next)=>{
    try{
        const comment = await Comment.findById(req.params.id);
        // res.status(200).json(comment)
        // const video = await Video.findbyId(res.params.id);
        if (req.user.id === comment.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json('The comment has been deleted.')
        }else{
            return next(createError(403, 'You can only delete your own comments!'))
        }
    }catch(err){
        next(err)
    }
}

const getComments = async(req, res, next)=>{
    try{
        const comments = await Comment.find({videoId:req.params.videoId})
        res.status(200).json(comments);
    }catch(err){
        next(err)
    }
}

module.exports = {
    addComment,
    deleteComment,
    getComments,
  };
  