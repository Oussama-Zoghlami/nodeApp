const express = require("express");
const app = express();
const auth = require("./path/auth.js");
const post = require("./path/post.js");
const path = require("path");

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/post',post);
app.use('/auth',auth);



app.use(express.static(path.join(__dirname,'path')));

app.listen(4200,function(){
    console.log('listening on port 4200');
})