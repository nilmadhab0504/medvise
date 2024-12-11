import { NextRequest, NextResponse } from "next/server";
import Admin from "../../../models/Admin";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/connectDB";

interface AdminRequestBody {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    await connectDB();

    const { name, email, password }: AdminRequestBody = await req.json();

    try {
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Admin already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            email,
            password: passwordHash,
        });

        await newAdmin.save();
        
        return NextResponse.json({ message: "Admin added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error adding admin" }, { status: 500 });
    }
}
