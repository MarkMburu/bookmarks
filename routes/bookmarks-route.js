const router = require('express').Router();
let bookmark = require('../model/bookmark-model');

router.route('/:userid').get((req,res)=>{
    let query = { userid: req.params.userid }
    bookmark.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err))
})

router.route('/:userid/add').post((req,res)=>{
   const {userid} = req.params
   const {author} = req.body
   const {content} = req.body
   const {description} = req.body
   const {title} = req.params
   const {url} = req.body
   const {urlToImage} = req.body
   const {source} = req.body
   const {id} = source
   const {name} = source
   const publishedAt = Date.parse(req.body.publishedAt)
   
   const newbookmark = new bookmark({
    userid,
    author,
    content,
    description,
    publishedAt,
    title,
    url,
    urlToImage,
    source:{
        id,
        name,
    }
   })

   newbookmark.save()
   .then(()=> res.json('bookmark added!'))
   .catch(err => res.status(400).json('Error: '+err))
});
router.route('/:id').get((req,res)=>{
    bookmark.findById(req.params.id)
    .then(bookmark => res.json(bookmark))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req,res)=>{
    bookmark.findByIdAndDelete(req.params.id)
    .then(()=> res.json('bookmark deleted'))
    .catch(err => res.status(400).json('Error: '+err));
});
module.exports = router