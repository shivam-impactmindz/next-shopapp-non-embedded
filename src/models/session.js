import mongoose, { mongo } from "mongoose";
const sessionSchema = new mongoose.Schema({
    id:{
  type:String,

    },
    state:{
type:String
    },
    shop:{
        type:String,
        trim:true,
        
    },
    accessToken:{
        type:String,
        trim:true
    },
    isOnline:{
        type:Boolean,
        enum:[true,false],
        default:false
    },
    scope:{
        type:[String],
        default: []
    }
       
    
})
const Session = mongoose.model.Session||mongoose.model('Session',sessionSchema)
export default Session;