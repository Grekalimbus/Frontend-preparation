import connectMongoDB from "@/libs/mongodb";
import React from "@/models/reactQuestion";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
	const { id } = params;
	await connectMongoDB();
	const react = await React.findOne({ _id: id });
	return NextResponse.json({ react }, { status: 200 });
}

export async function PATCH(request, { params }) {
	const { id } = params;
	const {
		newQuestion: question,
		newAnswer: answer,
		newCategory: category,
	} = await request.json();
	await connectMongoDB();
	await React.findByIdAndUpdate(id, { question, answer, category });
	return NextResponse.json({ message: "Questiom updated" }, { status: 200 });
}
