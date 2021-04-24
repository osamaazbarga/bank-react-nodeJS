const fs=require('fs');
const AccountsSchema = require('../models/accounts.model');

require('../config/db')
const UsersSchema=require('../models/bank.model')
const TransactionsSchema=require('../models/transactions.model')


const getUsers=(req,res)=>{
    UsersSchema.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
}

const getUserById=(req,res)=>{
    const id=req.params.id
    console.log("request")
    UsersSchema.findOne({userID:id}).then((user)=>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
}

const addUser=(req,res)=>{
    console.log(req.body.userID);
    const user=new UsersSchema(req.body)
    //const account=new accountsSchema({userID:req.body.userID})
    console.log(user);
    user.save().then(()=>{
        //console.log(user[0].userID);
        res.status(201).send(user)
        const account=new AccountsSchema({userID:user.userID})
        account.save()


    }).catch((error)=>{
        res.status(400).send("error: "+error)
    })
    
}

const putDeposit=(req,res)=>{
    const {id} = req.params;
    const {deposit} = req.body;
    UsersSchema.findOne({userID:id}).then((user)=>{

        if(!user){
            return res.status(404).send()
        }

        AccountsSchema.findOne({userID:id}).then((account)=>{
            
            if(!account){
                return res.status(404).send()
            }
            let newcash=account.cash+deposit
                AccountsSchema.findOneAndUpdate({userID:id},{$set:{cash:newcash}},{ new: true, upsert: true , useFindAndModify: false },(err,doc)=>{
                    console.log(doc.userID);
                    // TransactionsSchema.create({from_account_id:doc.userID},{operation_type:"deposit"},{amount:deposit})
                    const Transaction=new TransactionsSchema({from_account_id:doc.userID,operation_type:"deposit",amount:deposit})
                    Transaction.save()

                })


        })


        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
}

const putWithdraw=(req,res)=>{
    const {id} = req.params;
    const {withdraw} = req.body;
    UsersSchema.findOne({userID:id}).then((user)=>{

        if(!user){
            return res.status(404).send()
        }

        AccountsSchema.findOne({userID:id}).then((account)=>{
            
            if(!account){
                return res.status(404).send()
            }
            if(account.cash>=withdraw){
                
                let newcash=account.cash-withdraw
                AccountsSchema.findOneAndUpdate({userID:id},{$set:{cash:newcash}},{ new: true, upsert: true, useFindAndModify: false },(err,doc)=>{
                    console.log(doc);
                    const Transaction=new TransactionsSchema({from_account_id:doc.userID,operation_type:"withdraw",amount:withdraw})
                    Transaction.save()
                })
            }


        })


        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })

}

const putTransfer=(req,res)=>{


    const {id} = req.params;
    const {cash,to} = req.body;
    UsersSchema.findOne({userID:id}).then((user1)=>{
        if(!user1){
            return res.status(200).send({error:"the user1 is undfinded"})
        }else if(user1.isActive==false){
            return res.status(200).send({error:"the user1 is not active any more"})
        }else if(cash<=0){
            return res.status(200).send({error:"the index is uncorrent"})
        }else if(user1.credit*(-1)>user1.cash-cash){
            res.status(200).send({error:"no money to withdrow , the maximum withdrow is "+(user1.credit+user1.cash)})
        }
        UsersSchema.findOne({userID:to}).then((user2)=>{
            if(!user2){
                return res.status(404).send({error:"the user2 that you need to send for him is undefinded"})
            }else if(user2.isActive==false){
                return res.status(200).send({error:"the user2 is not active any more"})
            }

            let newcashuser1
            // console.log(newcashuser1);
            let newcashuser2
            // console.log(newcashuser2);
            AccountsSchema.findOne({userID:id}).then((accountuser1)=>{
            
                if(!accountuser1){
                    return res.status(404).send()
                }
                AccountsSchema.findOne({userID:to}).then((accountuser2)=>{
            
                    if(!accountuser2){
                        return res.status(404).send()
                    }

                    let newcashuser1=accountuser1.cash-cash
                    console.log(newcashuser1);
                    let newcashuser2=accountuser2.cash+cash
                    console.log(newcashuser2);

                    AccountsSchema.findOneAndUpdate({userID:id},{$set:{cash:newcashuser1}},{ new: true, upsert: true, useFindAndModify: false },(err1,doc1)=>{
                        console.log(doc1);
                        AccountsSchema.findOneAndUpdate({userID:to},{$set:{cash:newcashuser2}},{ new: true, upsert: true, useFindAndModify: false },(err2,doc2)=>{
                            console.log(doc2);
                            const Transaction=new TransactionsSchema({from_account_id:id,to_account_id:to,operation_type:"transfer",amount:cash})
                            Transaction.save()
                        })
                        return res.status(200).send({success:"the Transferring is already success, you cash now is: "+doc1.cash})
                    })
        
                })
            })
            
            
    
        })

    })

}

const putCredit=(req,res)=>{
    const {id} = req.params;
    const {credit} = req.body;
    const duplicateuser=bankJSON.find((user)=>user.id==id)
    if(duplicateuser==undefined){
        res.status(200).send({error:"the user is undfinded"})
    }else if(duplicateuser.isActive==false){
        res.status(200).send({error:"the user is not active any more"})
    }else if(credit<=0){
        res.status(200).send({error:"the index is uncorrent"})
    }else if(!credit){
        res.status(200).send({error:"please enter a credit"})
    }else {
        const users=bankJSON
        duplicateuser.credit+=credit
        const dataJSON=JSON.stringify(users)
        fs.writeFileSync('bank.json',dataJSON)
        res.status(200).send({error:"ok"})
    }

}

const putIsActive=(req,res)=>{

    const {id} = req.params;
    // UsersSchema.findOneAndUpdate({userID:id},{$set:{isActive:!this.isActive}},{ new: true, upsert: true, useFindAndModify: false },(err,doc)=>{
    //     console.log(doc);
    //     if(doc.isActive==true){
    //         return res.status(200).send({success:"the account is active now"})
    //     }
    //     return res.status(200).send({error:"the account is unactive any more"})
    // })

    UsersSchema.findOne({userID:id}, function(err, doc) {
        if(!doc){
            return res.status(404).send()
        }
        doc.isActive = !doc.isActive;
        doc.save();
        if(doc.isActive==true){
            return res.status(200).send({success:"the account is active now"})
        }
        return res.status(200).send({error:"the account is unactive any more"})
    });

    // const {id} = req.params;
    // console.log(id)
    // const duplicateuser=bankJSON.find((user)=>user.id==id)
    // if(duplicateuser==undefined){
    //     res.status(200).send({error:"the user is undfinded"})
    // }else{
    //     const users=bankJSON
    //     duplicateuser.isActive=!duplicateuser.isActive
    //     const dataJSON=JSON.stringify(users)
    //     fs.writeFileSync('bank.json',dataJSON)
    //     if(duplicateuser.isActive==true){
    //         res.status(200).send({error:"the account is active now"})
    //     }
    //     res.status(200).send({error:"the account is unactive any more"})



    // }
}

module.exports={
    getUsers,
    getUserById,
    addUser,
    putDeposit,
    putWithdraw,
    putTransfer,
    putCredit,
    putIsActive,
}