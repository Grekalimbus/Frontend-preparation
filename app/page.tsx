import Link from "next/link";
import Common from "./assets/svg/common.svg";
import CSS from "./assets/svg/css.svg";
import HTML from "./assets/svg/html.svg";
import JS from "./assets/svg/javascript.svg";
import React from "./assets/svg/react.svg";
import Redux from "./assets/svg/redux.svg";
import TS from "./assets/svg/typescript.svg";
import Footer from "./components/Footer";
import ILink from "./interfaces/ILink";
import "./mainPage.scss";

const arrayOfLinks: ILink[] = [
	{ icon: Common, description: "Общие", href: "/common" },
	{ icon: HTML, description: "HTML", href: "/html" },
	{ icon: CSS, description: "CSS", href: "/css" },
	{ icon: JS, description: "JavaScript", href: "/js" },
	{ icon: TS, description: "TypeScript", href: "/ts" },
	{ icon: React, description: "React", href: "/react" },
	{ icon: Redux, description: "Redux", href: "/redux" },
];

export default function Home() {
	return (
		<div className="main-page-wrapper">
			<main className="main-container-block">
				<h1>Вопросы с собеседований на Frontend разработчика</h1>
				<ul className="container-icon-technologies">
					{arrayOfLinks.map(link => {
						return (
							<li key={link.description}>
								<Link href={link.href}>
									<link.icon />
								</Link>
								<p className="descripion-for-link">{link.description}</p>
							</li>
						);
					})}
				</ul>
			</main>
			<Footer />
		</div>
	);
}
