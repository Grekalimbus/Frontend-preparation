import connectMongoDB from "@/libs/mongodb";
import CSS from "@/models/cssQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await CSS.create({ question, answer });
	return NextResponse.json(
		{ message: "Common Question Created" },
		{ status: 201 }
	);
}

export async function GET() {
	await connectMongoDB();
	const common = await CSS.find();
	return NextResponse.json({ common });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await CSS.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
