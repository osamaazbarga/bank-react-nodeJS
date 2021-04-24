import{Link, withRouter} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom';
import Api from '../Api/MainAPI'
import {useState,useEffect} from 'react'

const Deposit=()=>{

    const [userID, setUserID] = useState([]);
    const [amount, setAmount] = useState([]);
    const getId=(e)=>{
        console.log(userID)
        setUserID(e.target.value)
    }

    const getAmount=(e)=>{
        console.log(amount)
        setAmount(e.target.value)
    }

    const depositMoney=async(e)=>{
        e.preventDefault();
        console.log(e)
        const req=await Api.put(`/deposit/${userID}`,{
            deposit:Number(amount)

        })
        console.log(req)
    }



    return(<div>
            <form onSubmit={depositMoney}>
                ID user: <input type="text" name='id' onChange={getId}/>
                Amount Money To Deposit: <input type="text" name='name' onChange={getAmount}/>
                <input type="submit" value="submit"/>
            </form>
    </div>)
}

export default Deposit