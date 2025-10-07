const mongoose = require('mongoose')

const connectDB = async =>{
    try {
        let res = mongoose.connect(process.env.Mongo_db)

        if(res){
            console.log("connected")
        }

        
    } catch (error) {
        console.log("error in connection databsae"  , error )
        
    }
}

module.exports = connectDB;