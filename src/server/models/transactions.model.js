const mongoose=require('mongoose')
const validator=require('validator')


const transactions=mongoose.model('transactions',{
    from_account_id:{
        type:Number,
        required: true
        
    },
    to_account_id:{
        type:Number,
        default:-1
    },
    operation_type:{
        type:String,
    },
    amount:{
        type:Number,
        default:0

    }

})

module.exports=transactions