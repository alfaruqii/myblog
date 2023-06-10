import { main } from "../route";
import { useRouter } from "next/router";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async (req:Request,res:NextResponse) => {
  try {
    const router = useRouter()
    await main()
    const post = await prisma.posts.findFirst({
      where:{
        id:router.query.id?.toString()
      }
    })
    return NextResponse.json({message:"Succes",post},{status:200})
  } catch (error) {
    return NextResponse.json({message:"Error",error},{status:500})
  }
}
