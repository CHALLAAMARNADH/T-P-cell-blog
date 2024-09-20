const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')

//CREATE
router.post("/create",async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})


// GET all posts of the current user based on username




//DELETE
router.delete("/:id",async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})
router.get('/my-posts', async (req, res) => {
  try {
    // if (!req.user || !req.user.username) {
    //   console.error('User object not available in the request or missing username property.');
    //   return res.status(400).json({ error: 'User object not available in the request or missing username property.' });
    // }

    // const currentUser = req.params.user;
    // console.log("allposts", currentUser);
    const posts = await Post.find({ 
    //  username: { $ne: currentUser.username } 
    });
    console.log("allposts", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET all posts except current user's posts
router.get('/all-posts', async (req, res) => {
  try {
    // if (!req.user || !req.user.username) {
    //   console.error('User object not available in the request or missing username property.');
    //   return res.status(400).json({ error: 'User object not available in the request or missing username property.' });
    // }

    // const currentUser = req.params.user;
    // console.log("allposts", currentUser);
    const posts = await Post.find({ 
    //  username: { $ne: currentUser.username } 
    });
    console.log("allposts", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/:username', async (req, res) => {
  try {
    const posts = await Post.find({ username: req.params.username });
    console.log("search",posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports=router