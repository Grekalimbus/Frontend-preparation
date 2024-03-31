import connectMongoDB from "@/libs/mongodb";
import CommonQuestion from "@/models/commonQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await CommonQuestion.create({ question, answer });
	return NextResponse.json(
		{ message: "Common Question Created" },
		{ status: 201 }
	);
}

export async function GET() {
	await connectMongoDB();
	const commonQuestion = await CommonQuestion.find();
	return NextResponse.json({ commonQuestion });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await CommonQuestion.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
