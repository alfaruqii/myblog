import { main } from "../route";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req:Request,res:NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1]
    await main()
    const post = await prisma.posts.findFirst({
      where:{
        id
      }
    })
    if(!post) return NextResponse.json({message:"Not Found"},{status:404})
    return NextResponse.json({message:"Succes",post},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error",error},{status:500})
  } finally {
    await prisma.$disconnect()
  }
}
