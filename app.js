
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose = require('mongoose');

const homeContent = "Positive thinking is more than just a tagline. It changes the way we behave. And I firmly believe that when I am positive, it not only makes me better, but it also makes those around me better.Let us rise up and be thankful, for if we didn’t learn a lot today, at least we learned a little, and if we didn’t learn a little, at least we didn’t get sick, and if we got sick, at least we didn’t die; so let us all be thankful";
const aboutContent = "People feel more connected to others when they experience positive emotions. This leads to high quality relationships at work, which are related to personal growth, creativity, motivation, and productivity. Close relationships are a source of emotional support and they provide resources necessary for task accomplishment. People in high quality relationships exchange more information, are better at coordinating their efforts and have less conflict. ";
const contactContent = "I found that every single successful person I’ve ever spoken to had a turning point and the turning point was where they made a clear, specific, unequivocal decision that they were not going to live like this anymore. Some people make that decision at 15 and some people make it at 50 and most never make it at all.";

const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//app.get("/",function(req,res){
//  res.render("home");
//});

var posts=[];
const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);

app.get("/",function(req,res){
Post.find({},function(err,posts){
  res.render("home",{startingContent:homeContent,
                     posts:posts
    });
  });
});



app.get("/about",function(req,res){
  res.render("about",{startingContent:aboutContent})
});
app.get("/contact",function(req,res){
  res.render("contact",{startingContent:contactContent})
});
app.get("/compose",function(req,res){
  res.render("compose")
});


app.post("/compose",function(req,res){
  //console.log(req.body.Title)
 const posting=new Post({
   title:req.body.Title,
   content:req.body.post
 });
 posting.save(function(err){
   if(!err){
     res.redirect("/");
   }
 });
});

app.get("/posts/:postname",function(req,res){
  const reqtitle=_.lowerCase(req.params.postname);

  Post.findOne({_id:reqtitle},function(err,post){
      //console.log("yes");
     res.render("post",{
       title:post.title,
       content:post.content
     });
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
