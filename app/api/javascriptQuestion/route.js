import connectMongoDB from "@/libs/mongodb";
import JS from "@/models/javascriptQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await JS.create({ question, answer });
	return NextResponse.json(
		{ message: "Common Question Created" },
		{ status: 201 }
	);
}

export async function GET() {
	await connectMongoDB();
	const common = await JS.find();
	return NextResponse.json({ common });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await JS.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
