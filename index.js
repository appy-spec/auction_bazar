const express=require("express");
const app=express();
const mongoose = require("mongoose");
const Data=require("./models/data.js");
const path=require("path");

const port=3000;
app.set("view engine", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

main()
  .then(()=>{

    console.log("connection build successfully!!");
  })
  .catch((err) => {
    
    console.log(err)
  });

async function main() {

  await mongoose.connect("mongodb://127.0.0.1:27017/auction");
};

app.listen(port, ()=>{

  console.log(`server is listening on port ${port}`);

});

app.post("/home", async(req,res)=>{

  let{email,password}=req.body;
  let id=await Data.find({email:email});
  
  if(password!=id[0].password){

    res.render("login.ejs" , {error: "Invalid username or password. Please try again."});
  }
  else{

    res.render("home.ejs");

  }
});

app.get ("/login",(req, res)=>{

  res.render("login.ejs", {error:""});
  
});

app.get("/login/new", (req,res)=>{

  res.render("signup.ejs", {error:""});

});

app.post("/login",async (req,res)=>{

  let{name,email,password,confirmPassword}=req.body;

  let dbEmail=await Data.find({email:email});
  if(email==(dbEmail[0].email)){

    res.render("signup.ejs", {error:"Already register with this email"});

  }
  else if(password!=confirmPassword){

    res.render("signup.ejs", {error:"Both password should be same"});
    
  }else{

    let data={

      username:name,
      email:email,
      password:password,
     
    };

    let data1=new Data(data);
    data1.save().then((res)=>{
      console.log("saved successfully");
    }).catch((err)=>{
      console.log(err);
    });
    res.render("login.ejs", {error:""});
  }

});



