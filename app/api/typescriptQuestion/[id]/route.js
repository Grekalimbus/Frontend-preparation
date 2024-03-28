import connectMongoDB from "@/libs/mongodb";
import TS from "@/models/typescriptQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const ts = await TS.findOne({ _id: id });
	return NextResponse.json({ ts }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const { newQuestion: question, newAnswer: answer } = await request.json();
	await connectMongoDB();
	await TS.findByIdAndUpdate(id, { question, answer });
	return NextResponse.json(
		{ message: "React questiom updated" },
		{ status: 200 }
	);
}
