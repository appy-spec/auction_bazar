const mongoose=require("mongoose");

const dataSchema= new mongoose.Schema(

  {

    username:{

      type:String,
      maxLength:50,

    },
    email:{

      type:String,
      required:true
      
    },
    password:{

      type:String,
      require:true
    },

  }
);

const Data= mongoose.model("Data", dataSchema);

module.exports= Data;