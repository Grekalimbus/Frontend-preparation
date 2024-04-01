import connectMongoDB from "@/libs/mongodb";
import JavascriptQuestionModel from "@/models/javascriptQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer, category } = await request.json();
	await connectMongoDB();
	await JavascriptQuestionModel.create({ question, answer, category });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const javascript = JavascriptQuestionModel.find();
	return NextResponse.json({ javascript });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await JavascriptQuestionModel.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
