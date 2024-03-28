import connectMongoDB from "@/libs/mongodb";
import Redux from "@/models/reduxQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const redux = await Redux.findOne({ _id: id });
	return NextResponse.json({ redux }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const { newQuestion: question, newAnswer: answer } = await request.json();
	await connectMongoDB();
	await Redux.findByIdAndUpdate(id, { question, answer });
	return NextResponse.json(
		{ message: "React questiom updated" },
		{ status: 200 }
	);
}
