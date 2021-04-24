const express=require('express');
const router=express.Router();
const bankController=require('../controllers/bank.controller')
require('../config/db')

const UsersSchema=require('../models/bank.model')
const AccountsSchema=require('../models/accounts.model')
const TransactionsSchema=require('../models/transactions.model');
const usersSchema = require('../models/bank.model');



router.get('/',(req,res)=>{
    bankController.getUsers(req,res)
}).get('/:id',(req,res)=>{
    bankController.getUserById(req,res)
}).post('/',(req,res)=>{
    bankController.addUser(req,res)
}).put('/deposit/:id',(req,res)=>{
    bankController.putDeposit(req,res)
}).put('/withdraw/:id',(req,res)=>{
    bankController.putWithdraw(req,res)
}).put('/transfer/:id',(req,res)=>{
    bankController.putTransfer(req,res)
}).put('/credit/:id',(req,res)=>{
    const {id} = req.params;
    const {credit} = req.body;
    UsersSchema.findOne({userID:id}).then((user)=>{
        
        if(!user){
            return res.status(404).send()
        }else if(user.isActive==false){
            res.status(200).send({error:"the user is not active any more"})
        }else if(credit<=0){
            res.status(200).send({error:"the index is uncorrent"})
        }else if(!credit){
            res.status(200).send({error:"please enter a credit"})
        }
    })
    AccountsSchema.findOne({userID:id}).then((account)=>{
        
        if(!account){
            return res.status(404).send()
        }
        account.credit+=credit
        account.save()
        res.status(200).send({success:"ok"})
    })
    //bankController.putCredit(req,res)
}).put('/isactive/:id',(req,res)=>{
    bankController.putIsActive(req,res)
})


module.exports = router;