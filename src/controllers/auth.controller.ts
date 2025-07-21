// src/controllers/auth.controller.ts
import {Request, Response} from 'express'
import { generateAccesToken } from '../utils/generateToken';
import { User } from '../models/User';
import { cache } from '../utils/cache';
import dayjs from 'dayjs';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if(!user){
        return res.status(401).json({message: "Credenciales Incorrectas"});
    };

    if(password!==user.password){
        return res.status(401).json({message: "Credenciales Incorrectas"});
    };

    const userId="1234567"
    const accesToken=generateAccesToken(userId)
    cache.set(userId,accesToken,60*15)
    return res.json({ 
        message: "login exitoso",
        accesToken,
        roles: user.roles
    });
};

export const getTimeToken=(req:Request,res:Response)=>{
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);
    if(!ttl) return res.status(404).json({message:"Token no encontrado"});
    const now = Date.now();
    const timeToLifeSecond = Math.floor((ttl-now)/1000);
    const expTime=dayjs(ttl).format("HH:mm:ss");
    return res.json({ timeToLifeSecond, expTime });
}

export const updateToken=(req:Request, res:Response) => {
    const {userId} = req.params;
    const ttl = cache.getTtl(userId);
    if(!ttl) return res.status(404).json({message:"Token no encontrado"});
    const newTime:number = 60*15;
    cache.ttl(userId,newTime);
    return res.json({message: "Actualizado con exito"});
}

export const getAllUsers=async (req:Request, res:Response) => {
    const userList = await User.find();
    return res.json((userList));
}

export const getUserByUsername = async (req:Request, res:Response) =>{
    const {userName}=req.params;
    const UserByUsername=await User.find({username: userName});
    if (!UserByUsername) return res.status(404).json({ message: "Usuario no existe" });
    return res.json({ UserByUsername });
}

export const saveUser = async(req:Request, res:Response) => {
    try{
        const { name, userName, email, phone, password, roles } = req.body;
        const newUser = new User({
            name,
            id: Date.now().toString(),
            username:userName,
            email,
            phone,
            password,
            roles: Array.isArray(roles) ? roles : [roles || 'user'],
            status: true
        });
        const user = await newUser.save();
        return res.json({user});
    }catch(error){
        console.log("Error ocurrio en SAVEUSERS: ", error);
        return res.status(500).json({error: "Error al guardar usuario"});
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { emailUser, phone, password, roles, name } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        if (user.email !== emailUser) {
            const existingUser = await User.findOne({ email: emailUser });
            if (existingUser) return res.status(426).json({ message: "El correo ya existe" });
            user.email = emailUser;
        }

        user.password = password ?? user.password;
        user.roles = Array.isArray(roles) ? roles : [roles || user.roles[0]];
        user.phone = phone ?? user.phone;
        user.name = name ?? user.name;

        const updatedUser = await user.save();
        return res.json({ updatedUser });
    } catch (error) {
        console.error("Error en updateUser:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deleteUser = async(req:Request, res:Response)=>{
    const {userId} = req.params;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "Usuario no encontrado"});
    user.status = false;
    user.deleteDate = new Date();
    await user.save();
    return res.json({message: "Usuario desactivado"});
}