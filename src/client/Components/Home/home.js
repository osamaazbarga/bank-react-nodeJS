import React,{useState,useEffect} from 'react'
import{BrowserRouter,Route} from 'react-router-dom'
import{Link} from 'react-router-dom'
import './Home.css'
import Api from '../Api/MainAPI'
import Withdraw from '../Withdraw/Withdraw'
import Deposit from '../Deposit/Deposit'
import Transfer from '../Transfer/Transfer'
import AddUser from '../Adduser/Adduser'



const Home=()=>{
    const [user, setUser] = useState([]);
    useEffect(() => {

        getApi()
    },[])

    const [data, setData] = useState([]);
    const getApi=async()=>{
        try{
            let req =await Api.get('');
            setData(req.data)
            console.log(req.data)
        }catch(err){
            console.log(err)
        }

    }

    const Header=()=>{
        return(
            <div>

                    <button><Link to={`/`}>Home</Link></button>

                    <button><Link to={`/adduser`}>Add User</Link></button>
                    <button><Link to={`/withdraw`}>Withdraw</Link></button>
                    <button><Link to={`/deposit`}>Deposit</Link></button>
                    <button><Link to={`/transfer`}>Transfer</Link></button>

            </div>
        )
    }


    const Renderdata=()=>{
        

        return data.map((user)=>{
            if(user.isActive===true){
                console.log(user)
                return (<div className="box" key={user.userID}>
                <div>ID: {user.userID}</div>
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
                
            </div>)
            }
            return <div className="box2"></div>
            
            // return <div key={user.id}>
            //     <span>{user.id}</span>
            //     <span>{user.id}</span>
            // </div>
        })
        // console.log(data)
        // return <div></div>
    }




    return(
        
        <div>
            <BrowserRouter>
            <div>
                <Header/>

                
                <Route path="/" exact component={Renderdata}/>
                <Route path="/withdraw" component={Withdraw}/>
                <Route path="/deposit" component={Deposit}/>

                <Route path="/transfer" component={Transfer}/>
                <Route path="/adduser" component={AddUser}/>

                
                
                
            </div>
            </BrowserRouter>
            
            {/* <Renderindexbar/> */}
            
            {/* <button><Link to={`/withdraw/${pop.league.id}`}><img src={pop.league.logo} alt="popleage"/></Link></button>
            <button></button> */}

        </div>
    )

}

export default Home