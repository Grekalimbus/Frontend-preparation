import connectMongoDB from "@/libs/mongodb";
import TS from "@/models/typescriptQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await TS.create({ question, answer });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const typescript = await TS.find();
	return NextResponse.json({ typescript });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await TS.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
