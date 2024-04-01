import connectMongoDB from "@/libs/mongodb";
import ReduxQuestionModel from "@/models/reduxQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const redux = await ReduxQuestionModel.findOne({ _id: id });
	return NextResponse.json({ redux }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await ReduxQuestionModel.findByIdAndUpdate(id, {
		question,
		answer,
		category,
	});
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
