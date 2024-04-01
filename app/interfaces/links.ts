import { FaComputer } from "react-icons/fa6";
import { IoLogoHtml5 } from "react-icons/io5";
import { LiaReact } from "react-icons/lia";
import { IconType } from "react-icons/lib";
import { SiCss3, SiJavascript, SiRedux, SiTypescript } from "react-icons/si";
import gitHub from "../assets/svg/gitHub.svg";
import instagram from "../assets/svg/instagram.svg";
import telegram from "../assets/svg/telegram.svg";

export default interface ILink {
	icon: IconType;
	description: string;
	href: string;
}

export const arrayNavLinks: ILink[] = [
	{
		icon: FaComputer,
		description: "Общие",
		href: "preparationPage/common",
	},
	{
		icon: IoLogoHtml5,
		description: "HTML",
		href: "preparationPage/html",
	},
	{ icon: SiCss3, description: "CSS", href: "preparationPage/css" },
	{
		icon: SiJavascript,
		description: "JavaScript",
		href: "preparationPage/javascript",
	},
	{
		icon: SiTypescript,
		description: "TypeScript",
		href: "preparationPage/typescript",
	},
	{
		icon: LiaReact,
		description: "React",
		href: "preparationPage/react",
	},
	{
		icon: SiRedux,
		description: "Redux",
		href: "preparationPage/redux",
	},
];

export const arrayFooterLinks: ILink[] = [
	{
		icon: instagram,
		href: "https://www.instagram.com/danilimbus/",
		description: "Ссылка на инстаграм",
	},
	{
		icon: gitHub,
		href: "https://github.com/Grekalimbus",
		description: "Ссылка на Гит-Хаб",
	},
	{
		icon: telegram,
		href: "https://t.me/danilimbus_02",
		description: "Ссылка на телеграм",
	},
];
