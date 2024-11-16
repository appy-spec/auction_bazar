const mongoose = require("mongoose");
const Data=require("./models/data.js");

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

let data1=new Data({

  username:"User system",
  email:"user1@gmail.com",
  password:"user123"

});

data1.save().then(()=>{

  console.log("saved successfully");

})
.catch((err)=>{

  console.log(err);

});
