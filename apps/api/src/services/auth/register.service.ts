import { hashPassword } from "@/libs/bcrypt"
import prisma from "@/prisma"
import { User } from "@prisma/client"


export const registerService = async(body : Omit<User,"id">)=>{
    try {
        const {email,password}  = body

        const existingUser = await prisma.user.findFirst({
            where:{email:email}
        })

        if (existingUser) {
            throw new Error("Email already exist!")
        }

        const hashedPassword = await hashPassword(password)
        const referralCode = await Math.random().toString(36).substring(2,7);

        const newUser = await prisma.user.create({
            data:{...body,password:hashedPassword,referral_code:referralCode}
        })
        return{
            message :"Register success !",
            data:newUser
        }
    } catch (error) {
        throw error
        
    }
}