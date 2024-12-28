import React, {useState} from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";


function Login() {
        const [formData, setFormData] = useState({
          name: "",
          password: ""
        })
        const [showPassword, setShowPassword] = useState(false);
        const [error, showError] = useState("");
        const navigate = useNavigate();
        const { login } = useAuth();

    function togglePassword() {
        setShowPassword((prevValue) => {
          return !prevValue;
        });
      }

      function handleChange(event) {
        const { name, value } = event.target;
    
        setFormData((prevData) => {
          return {
            ...prevData,
            [name]: value
          };
        });
      }
      async function handleSubmit(event) {
        event.preventDefault();
        try {
          const response= await axios.post("http://localhost:3000/login", {
            name:formData.name,
            password:formData.password,
          });
          console.log(response.data);
          login();
          setTimeout(() => {
            navigate("/main");
          }, 500);
        } catch(error){
          if (error.response.status === 401) {
            showError("Wrong credentials, please try again.")
          }
          console.log(error);
        }
      }
    return(
        <div className="reg-container"> 
            <div className="reg-form">
        <h1 className="reg-title">Time to Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="reg-info">
        <label htmlFor="">Username</label>
        <input type="text" placeholder="Enter your username" onChange={handleChange} name="name" value={formData.name} required />
        </div>
        <div className="reg-info">
        <label  htmlFor="">Password</label>
        <input type={showPassword ? "text" : "password"} onChange={handleChange} placeholder="Enter your password" name="password" value={formData.password} required />
        <span className="span-2"onClick={togglePassword}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
        </div>
        {error && <p style={{ color: "red", fontSize: "15px", fontWeight:"bold" }}>{error}</p>}
        <button cltype="submit">Login</button>
        <p className="already-log">Don't have an acount? Register <Link to="/register">here.</Link></p>
        </form>
    </div>
    <Footer/>
    </div>
       
        
    );
}

export default Login;