import{Link, withRouter} from 'react-router-dom'
import ReactDOM from 'react-dom';
import Api from '../Api/MainAPI'
import React,{useState,useEffect} from 'react'

const AddUser=()=>{
    const [user, setUser] = useState([]);
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);


    const getId=(e)=>{
        console.log(user)
        setUser(e.target.value)
    }

    const getName=(e)=>{
        console.log(user)
        setName(e.target.value)
    }
    const getEmail=(e)=>{
        console.log(user)
        setEmail(e.target.value)
    }

    const adduser=async(e)=>{
        e.preventDefault();
        console.log(e)
        const req=await Api.post('',{
            userID:Number(user),
            name:String(name),
            email:String(email)

        })
        console.log(req)
    }

    return(<div>
        <form onSubmit={adduser}>
        ID user: <input type="text" name='id' onChange={getId}/>
        Name: <input type="text" name='name' onChange={getName}/>
        Email: <input type="text" name='email' onChange={getEmail}/>
        <input type="submit" value="submit"/>
        </form>
        </div>)
}

export default AddUser