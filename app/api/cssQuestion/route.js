import connectMongoDB from "@/libs/mongodb";
import CSS from "@/models/cssQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await CSS.create({ question, answer });
	return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const css = await CSS.find();
	return NextResponse.json({ css });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await CSS.findByIdAndDelete(id);
	return NextResponse.json({ message: "Question Deleted" }, { status: 200 });
}
