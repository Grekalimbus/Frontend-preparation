import connectMongoDB from "@/libs/mongodb";
import CommonQuestionModel from "@/models/commonQuestion";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await CommonQuestionModel.findByIdAndUpdate(id, {
		question,
		answer,
		category,
	});
	return NextResponse.json({ message: "Topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const common = await CommonQuestionModel.findOne({ _id: id });
	return NextResponse.json({ common }, { status: 200 });
}
