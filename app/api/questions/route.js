import connectMongoDB from "@/libs/mongodb";
import CommonQuestionModel from "@/models/commonQuestion";
import CssQuestionModel from "@/models/cssQuestion";
import HtmlQuestionModel from "@/models/htmlQuestion";
import JavascriptQuestionModel from "@/models/javascriptQuestion";
import ReactQuestionModel from "@/models/reactQuestion";
import ReduxQuestionModel from "@/models/reduxQuestion";
import TypescriptQuestionModel from "@/models/typescriptQuestion";
import { NextResponse } from "next/server";

export async function GET() {
	await connectMongoDB();
	const common = await CommonQuestionModel.find();
	const css = await CssQuestionModel.find();
	const html = await HtmlQuestionModel.find();
	const javascript = await JavascriptQuestionModel.find();
	const typescript = await TypescriptQuestionModel.find();
	const react = await ReactQuestionModel.find();
	const redux = await ReduxQuestionModel.find();
	return NextResponse.json({
		common,
		html,
		css,
		javascript,
		typescript,
		react,
		redux,
	});
}
