import connectMongoDB from "@/libs/mongodb";
import TypescriptQuestionModel from "@/models/typescriptQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer, category } = await request.json();
	await connectMongoDB();
	await TypescriptQuestionModel.create({ question, answer, category });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const typescript = await TypescriptQuestionModel.find();
	return NextResponse.json({ typescript });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await TypescriptQuestionModel.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
