import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function main() {
  try {
    await prisma.$connect()
  } catch(err) {
    return Error("Database connection unsuccessfull")
  }
}

export const GET = async (req:Request,res:NextResponse) => {
  try {
    main()
    const posts = await prisma.posts.findMany()
    return NextResponse.json({message:"Succes",posts},{status:200})
  } catch (err) {
    return NextResponse.json({message:"Error",err},{status:500})
  }
}

export const POST = async (req:Request,res:NextResponse) => {
  try {
    const {title,description} = await req.json()
    await main()
    const posts = await prisma.posts.create({
      data:{
        title,
        description
      }
    })
    return NextResponse.json({message:"Succes",posts},{status:201})
  } catch (err) {
    return NextResponse.json({message:"Error",err},{status:500})
  } finally {
    await prisma.$disconnect()
  }
}

