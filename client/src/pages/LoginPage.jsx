import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userContext } from "../userContext";
import { useContext } from "react";
 
export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const[redirect, setRedirect] = useState(false);
    const {setUser} = useContext(userContext);    // may be some problem
    async function handleLoginSubmit(ev){
        ev.preventDefault();
       try{ 
        const  {data} =  await axios.post('/Login',{email,password});
        setUser(data);
        alert('Login succesfull');
        setRedirect(true);
       }
       catch(e){
        console.log(e);
        alert('Login Failed');
       }
    }
    
    if(redirect){
        return <navigate to ={'/'} />
    }





    return(
        <div className="mt-4 grow flex item-center justify-around">
            <div className="mt-8">
            <h1 className="text-2xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" 
                    placeholder="your@mail.com"
                    value={email} 
                    onChange={ev=> setEmail(ev.target.value)}/>
                <input type="password"
                    placeholder="password"
                    value={password} 
                    onChange={ev=> setPassword(ev.target.value)}/> 
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet?
                    <Link className = "underline text-black px-4"to ={'/register'}>Register Now</Link>
                </div>
            </form>
            </div>
        </div>
    );
} 