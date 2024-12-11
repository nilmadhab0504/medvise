import { NextRequest, NextResponse } from "next/server";
import Doctor from "../../../models/Doctor";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/connectDB";

interface DoctorRequestBody {
    name: string;
    email: string;
    password: string;
    specialization: string;
}

export async function POST(req: NextRequest) {
    await connectDB();

    const { name, email, password, specialization }: DoctorRequestBody = await req.json();

    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return NextResponse.json({ error: "Doctor already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: passwordHash,
            specialization,
        });

        await newDoctor.save();

        return NextResponse.json({ message: "Doctor added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error adding doctor" }, { status: 500 });
    }
}
