import connectMongoDB from "@/libs/mongodb";
import TypescriptModel from "@/models/typescriptQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const ts = await TypescriptModel.findOne({ _id: id });
	return NextResponse.json({ ts }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await TypescriptModel.findByIdAndUpdate(id, { question, answer, category });
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
