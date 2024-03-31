import Link from "next/link";
import { FaComputer } from "react-icons/fa6";
import { IoLogoHtml5 } from "react-icons/io5";
import { LiaReact } from "react-icons/lia";
import { SiCss3, SiJavascript, SiRedux, SiTypescript } from "react-icons/si";
import ILink from "./interfaces/links";
import "./mainPage.scss";

const arrayOfLinks: ILink[] = [
	{
		icon: FaComputer,
		description: "Общие",
		href: "preparationPage/commonQuestion",
	},
	{
		icon: IoLogoHtml5,
		description: "HTML",
		href: "preparationPage/htmlQuestion",
	},
	{ icon: SiCss3, description: "CSS", href: "preparationPage/cssQuestion" },
	{
		icon: SiJavascript,
		description: "JavaScript",
		href: "preparationPage/jsQuestion",
	},
	{
		icon: SiTypescript,
		description: "TypeScript",
		href: "preparationPage/tsQuestion",
	},
	{
		icon: LiaReact,
		description: "React",
		href: "preparationPage/reactQuestion",
	},
	{
		icon: SiRedux,
		description: "Redux",
		href: "preparationPage/reduxQuestion",
	},
];

export default function Home() {
	return (
		<main className="main-container-block">
			<h1>Вопросы с собеседований на Frontend разработчика</h1>
			<ul className="container-icon-technologies">
				{arrayOfLinks.map(link => {
					return (
						<li key={link.description}>
							<Link href={link.href}>
								<link.icon />
								<p className="descripion-for-link">{link.description}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</main>
	);
}
