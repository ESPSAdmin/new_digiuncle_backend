const UserTable = require("../model/userModule")
const bcrypt= require('bcrypt')
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
require("dotenv").config()


const saltRounds = 10;


 const CreateUser = async(req,res)=>{
    const data = req.body
    console.log(data)
    try{
       
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const result = await UserTable.create({...data,password:hashedPassword,user_id:uuidv4()})
        const token = jwt.sign({id:result.user_id},process.env.SECURE_KEY)
        return res.status(201).json({
            message:"user created successful",
            result,
            token

        })
    }catch(err){
        console.log("Create user error")
        return res.status(500).json({
            message:"internal server error",
            error:err
        })
    }
}


const LoginUser = async (req, res) => {
    const { email, password } = req.body;
   
    try {
        
        const user = await UserTable.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not Exist' });
        }

        const compare = bcrypt.compareSync(password,user.password)
        if(!compare){
            return res.status(403).json({
                message:"Wrong password"
            })
        }
        const token = jwt.sign({id:user.user_id},process.env.SECURE_KEY)
        return res.status(200).json({
            message:"user Login successful",
            token,
            data:user
        })

    
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const UpdateUser = async (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 

    try {
        
        const user = await UserTable.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(updatedData);
        const updatedUser = await UserTable.findByPk(id);

        return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Update user error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const Getuser = async(req,res) => {
    const {authorization} = req.headers
    const auth = authorization?.split(" ")[1]
    try{
        const {id} =  jwt.verify(auth,process.env.SECURE_KEY)
        if(!id){
            return res.status(403).json({
                message:"you are not authorize"
            })
        }
        const getData = await UserTable.findAll({where:{user_id:id}})
        return res.status(200).json({
            message:"user data found",
            data:JSON.stringify(getData)
        })
    }catch(err){
        console.log("Get user Error")
        return res.status(500).json({
            message:"internal server error"
        })
    }
}



module.exports = {
    CreateUser,
    LoginUser,
    UpdateUser,
    Getuser
}