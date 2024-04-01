import connectMongoDB from "@/libs/mongodb";
import HTML from "@/models/htmlQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const html = await HTML.findOne({ _id: id });
	return NextResponse.json({ html }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await HTML.findByIdAndUpdate(id, { question, answer, category });
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
