import connectMongoDB from "@/libs/mongodb";
import JS from "@/models/javascriptQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const js = await JS.findOne({ _id: id });
	return NextResponse.json({ js }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await JS.findByIdAndUpdate(id, { question, answer, category });
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
