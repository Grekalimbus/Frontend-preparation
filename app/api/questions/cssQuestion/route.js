import connectMongoDB from "@/libs/mongodb";
import CssQuestionModel from "@/models/cssQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer, category } = await request.json();
	await connectMongoDB();
	await CssQuestionModel.create({ question, answer, category });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const css = await CssQuestionModel.find();
	return NextResponse.json({ css });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await CssQuestionModel.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
