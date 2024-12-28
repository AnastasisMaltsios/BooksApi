import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Books",
  password: "stasnoobs1999#",
  port: 5432,
});
db.connect();

const app = express();
const port = 3000;
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running.");
});


app.post("/register", async (req, res) => {
  const {name, email, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", 
    [name, email, hashPassword]
  );
  res.status(200).json({ message: "Registration successful!" });
  } catch (error) {
    console.log(error);
  }
  
});
app.post("/login", async (req, res) => {
  const {name, password} = req.body;
  try {
    const result = await db.query("SELECT username, password FROM users WHERE username = $1 ", [name]);

    if (result.rows.length === 0) {
      return res.status(401).json({message:"Wrong Credentials"});
    }
    const user = result.rows[0];
    const valisPassword = await bcrypt.compare(password, user.password);
    if (!valisPassword) {
      return res.status(401).json({message: "Wrong Credentials"});
    }
      res.status(200).json({message: "Yeeeeeah!"});
  } catch (error) {
    console.log(error);
    
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
