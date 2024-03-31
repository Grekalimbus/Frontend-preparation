import connectMongoDB from "@/libs/mongodb";
import CommonQuestion from "@/models/commonQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const commonQuestion = await CommonQuestion.findOne({ _id: id });
	return NextResponse.json({ commonQuestion }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const { newQuestion: question, newAnswer: answer } = await request.json();
	await connectMongoDB();
	await CommonQuestion.findByIdAndUpdate(id, { question, answer });
	return NextResponse.json(
		{ message: "Common questiom updated" },
		{ status: 200 }
	);
}
