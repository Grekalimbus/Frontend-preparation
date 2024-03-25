import connectMongoDB from "@/libs/mongodb";
import Common from "@/models/commonQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await Common.create({ question, answer });
	return NextResponse.json(
		{ message: "Common Question Created" },
		{ status: 201 }
	);
}

export async function GET() {
	await connectMongoDB();
	const common = await Common.find();
	return NextResponse.json({ common });
}

export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Common.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}