import connectMongoDB from "@/libs/mongodb";
import HtmlQuestionModel from "@/models/htmlQuestion";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await HtmlQuestionModel.findByIdAndUpdate(id, { question, answer, category });
	return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const html = await HtmlQuestionModel.findOne({ _id: id });
	return NextResponse.json({ html }, { status: 200 });
}
