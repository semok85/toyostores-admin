import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";


export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
  
      const body = await req.json();
  
      const { name, email } = body;
  console.log(name, email)
  
      if (!email) {
        return new NextResponse("Email is required", { status: 400 });
      }
  
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }

      const user = await prismadb.user.findFirst({
        where: {
          email
        }
      })

      if (user) {
        return NextResponse.json(user)
      } else if(!user) {
        const newUser = await prismadb.user.create({
          data: {
            name,
            email,
            address: "",
            phone: "",
            storeId: params.storeId
          }
        });
        return NextResponse.json(newUser)
      }

    } catch (error) {
      console.log('[USERS_POST]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };