const mongoose=require('mongoose')
const validator=require('validator')

const usersSchema=mongoose.model('user',{
    userID:{
        type:Number,
        unique: true
        
    },
    name:{
        type:String,
        unique: true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },

})


const accounts=mongoose.model('bank_account',{
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


const transactions=mongoose.model('transaction',{
    from_account_id:{
        type:Number,
        required: true
        
    },
    to_account_id:{
        type:Number,
    },
    operation_type:{
        type:Number,
    },
    amount:{
        type:Number,
        default:0

    }

})

module.exports=usersSchema
