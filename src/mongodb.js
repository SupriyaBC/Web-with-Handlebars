const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
    
});
LogInSchema.index({ name: 1 }, { unique: true });

const collection1=new mongoose.model("Collection1",LogInSchema);

module.exports=collection1;