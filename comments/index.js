const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 4001;



const commentsByPostId = {};

app.get('/posts/:id/comments',(req,res)=> {

    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments',(req,res) =>{

    const commentId = randomBytes(4).toString('hex');
    const {content}  = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    // checking for the condition if comments id match with the given commentsByPostId, if it is undefined then it will return the empty array


    comments.push({id:commentId,content});

    commentsByPostId[req.params.id] = comments;

    // send entire array of comments
    res.status(201).send(comments);


});

app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`);
});