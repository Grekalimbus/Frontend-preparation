import connectMongoDB from "@/libs/mongodb";
import CSS from "@/models/cssQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const css = await CSS.findOne({ _id: id });
	return NextResponse.json({ css }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const { newQuestion: question, newAnswer: answer } = await request.json();
	await connectMongoDB();
	await CSS.findByIdAndUpdate(id, { question, answer });
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
