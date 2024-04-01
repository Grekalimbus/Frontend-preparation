import connectMongoDB from "@/libs/mongodb";
import CssQuestionModel from "@/models/commonQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const css = await CssQuestionModel.findOne({ _id: id });
	return NextResponse.json({ css }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await CssQuestionModel.findByIdAndUpdate(id, {
		question,
		answer,
		category,
	});
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
