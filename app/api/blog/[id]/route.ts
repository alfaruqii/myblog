import { main } from "../route";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.posts.findFirst({
      where: {
        id,
      },
    });
    if (!post)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json({ message: "Succes", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.posts.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
    if (!post) return NextResponse.json({ message: "Error" }, { status: 500 });
    return NextResponse.json({ message: "Succes", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id = req.url.split("/blog/")[1];
    await main();
    const post = await prisma.posts.delete({
      where: {
        id,
      },
    });
    if (!post) return NextResponse.json({ message: "Error" }, { status: 500 });
    return NextResponse.json(
      { message: "Deleting Succes", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
