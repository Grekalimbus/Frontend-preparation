import connectMongoDB from "@/libs/mongodb";
import React from "@/models/reactQuestion";
import { NextResponse } from "next/server";

export async function POST(request) {
	const { question, answer } = await request.json();
	await connectMongoDB();
	await React.create({ question, answer });
	return NextResponse.json(
		{ message: "Common Question Created" },
		{ status: 201 }
	);
}

export async function GET() {
	await connectMongoDB();
	const common = await React.find();
	return NextResponse.json({ common });
}

// http://localhost:3000/api/reactQuestion/?id=123
export async function DELETE(request) {
	const id = request.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await React.findByIdAndDelete(id);
	return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
