const express = require("express");
const router = express.Router();

const Arrays = [
    {id:1 , value: "Yassine"},
    {id:2 , value: "Abidi"},
    {id:3 , value: "25 years"}
]


router.get('/all',(req,res) => {
    res.json(Arrays);
});

router.get('/:id',(req,res) => {
    const id = parseInt(req.params.id);
    const post = Arrays.find(post => post.id === id);
    res.json(post);
});

module.exports= router;

