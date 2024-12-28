import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"
import Footer from "./Footer";
import { Link } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from "axios";

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
      name: "",
      email:"",
      password:"",
      confirmPassword:""
    });
    const navigate = useNavigate();

    function togglePassword() {
        setShowPassword((prevValue) => {
          return !prevValue;
        });
      }
      function toggleConfirmPassword() {
        setShowConfirmPassword((prevValue) => {
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
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          return;
        } setError("");
        try {
          const response= await axios.post("http://localhost:3000/register", {
            name:formData.name,
            email:formData.email,
            password:formData.password,
          });
          console.log(response.data);
          
          alert("Register succesfull!! You can now login to the app!");
          setTimeout(() => {
            navigate("/login");
          }, 500);
        } catch(error){
          console.log(error);
        }
      }
    return(
        <div className="reg-container"> 
            <div className="reg-form">
        <h1 className="reg-title">Time to Register</h1>
        <form onSubmit={handleSubmit} action="/register" method="post">
        <div className="reg-info">
        <label htmlFor="">Username</label>
        <input type="text" placeholder="Enter your username" onChange={handleChange}  value={formData.name} name="name" required />
        </div>
        <div className="reg-info">
        <label htmlFor="">Email</label>
        <input type="text" placeholder="Enter your email" onChange={handleChange}   value={formData.email} name="email" required />
        </div>
        <div className="reg-info">
        <label  htmlFor="">Password</label>
        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleChange} value={formData.password} name="password" required />
        <span className="span-1"onClick={togglePassword}>{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
        </div>
        <div className="reg-info">
        <label htmlFor="">Confirm Password</label>
        <input type={showConfirmPassword ? "text" : "password"} onChange={handleChange} placeholder="Confirm password" value={formData.confirmPassword} name="confirmPassword"required />
        <span className="span-2" onClick={toggleConfirmPassword}>{showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</span>
        </div>
        {error && <p style={{ color: "red", fontSize: "15px", fontWeight:"bold" }}>{error}</p>}
        <button cltype="submit">Register</button>
        <p className="already-log">Already have an acount? Login <Link to="/login">here.</Link></p>
        </form>
    </div>
    <Footer/>
    </div>
       
        
    );
}

export default Register;