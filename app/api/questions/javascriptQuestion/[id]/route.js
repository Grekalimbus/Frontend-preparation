import connectMongoDB from "@/libs/mongodb";
import JavascriptQuestionModel from "@/models/javascriptQuestion";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await JavascriptQuestionModel.findByIdAndUpdate(id, {
		question,
		answer,
		category,
	});
	return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const javascript = await JavascriptQuestionModel.findOne({ _id: id });
	return NextResponse.json({ javascript }, { status: 200 });
}
