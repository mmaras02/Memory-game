import { Link, useNavigate} from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const Login = () => {
    const {data:userData,isPending,error}=useFetch('http://localhost:8000/accounts');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    let navigate = useNavigate();
    console.log(userData);

    const handleLogin=(e)=>{
        e.preventDefault();
        
        if(userData)
        {
            const user=userData.find(user=>user.email===email && user.password===password);
            if(user)
            {
                alert("Success!");
                navigate("/home")
            }
    
            else
                alert("wrong");
        }
        
    }

    return (
        <div className="login">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                <div className="type-form">
                    <label htmlFor="LoginEmail">Email:</label>
                    <input type="text" value={email} className="form-box" placeholder="Email/Username" onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="type-form">
                    <label htmlFor="LoginPassword">Password:</label>
                    <input type="password" value={password}  className="form-box" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                
                <div className="button-form">
                    <button type="submit">Login</button>
                    <Link to="#">Don't have an account? Click here!</Link>
                </div>
                </form>
            </div>
        </div>
        
     );
}
 
export default Login;