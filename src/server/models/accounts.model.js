const mongoose=require('mongoose')
const validator=require('validator')

const accounts=mongoose.model('bankaccount',{
    userID:{
        type:Number,
        unique: true
        
    },
    credit:{
        type:Number,
        default:0
    },
    cash:{
        type:Number,
        default:0
    },
    isActive:{
        type:Boolean
    }

})


module.exports=accounts