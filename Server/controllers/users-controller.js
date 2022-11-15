const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const HummusRecipe = require('hummus-recipe');

const getData = async (req, res, next) => {
    const results = await db.query("Select * from users");
    res.json(results.rows);
};

// const addUser = async (req, res, next) => {
//     let results;
//     try{
//         results = await db.query("INSERT INTO users (name, email, password, image, role) VALUES ($1, $2, $3, '', false) Returning *",
//         [ req.body.name, req.body.email, req.body.password ]);
//     }catch(err){
//         console.log(err);
//     }
//     return res.json(results);
// }

const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        const user = await db.query("SELECT * FROM users WHERE email=$1", [email]);

        const existingUser = user.rows[0];

        if(!existingUser){
            return res.status(404).json({ message: "User doesn't exists." });
        }

        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPassCorrect) return res.status(400).json({message: "Invalid credentials."});

        const token = jwt.sign({email: existingUser.email, id: existingUser.id}, 'test', {expiresIn: "1h"});

        return res.status(200).json({result: existingUser, token});

    }catch(err){
        res.status(500).json({message: "Something went wrong."});
    }
}

const signup = async (req, res, next) => {
    console.log(req.body.password);
    const {firstName, lastName, email, password, confirmPassword } = req.body;
    
    try{
        const existingUser = await db.query("SELECT * FROM users WHERE email=$1", [email]);
       
        if(existingUser.rowCount > 0){
            return res.status(400).json({ message: "User already exists." });
        }

        if(password !== confirmPassword) {
            
            return res.status(400).json({ message: "Password don't match" });
        }
        
        const hashedPass = await bcrypt.hash(password, 12);
        console.log(hashedPass);
        const results = await db.query("INSERT INTO users (firstname, lastname, email, password, image, role) VALUES ($1, $2, $3, $4, 'test', false) Returning *", [firstName, lastName, email, hashedPass]);
        const result = results.rows[0];
        const token = jwt.sign({email: result.email, id: result.id}, 'test', {expiresIn: "1h"});
        
        res.status(200).json({result, token});

    }catch(err){
        res.status(500).json({message: "Something went wrong."});
    }
}

// const pdf = () => {

//     const pdfDoc = new HummusRecipe('', '');
//     pdfDoc
//     .encrypt({
//         userPassword: '123',
//         ownerPassword: '123',
//         userProtectionFlag: 4
//     })
//     .endPDF();
// }

exports.getData = getData;
exports.signin = signin;
exports.signup = signup;
// exports.pdf = pdf;