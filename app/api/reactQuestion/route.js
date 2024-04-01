import connectMongoDB from "@/libs/mongodb";
import ReactQuestionModel from "@/models/reactQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer, category } = await request.json();
	await connectMongoDB();
	await ReactQuestionModel.create({ question, answer, category });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const react = await ReactQuestionModel.find();
	return NextResponse.json({ react });
}

// http://localhost:3000/api/reactQuestion/?id=123
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await ReactQuestionModel.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
