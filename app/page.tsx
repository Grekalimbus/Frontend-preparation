import Link from "next/link";
import Common from "./assets/svg/common.svg";
import CSS from "./assets/svg/css.svg";
import HTML from "./assets/svg/html.svg";
import JS from "./assets/svg/javascript.svg";
import React from "./assets/svg/react.svg";
import Redux from "./assets/svg/redux.svg";
import TS from "./assets/svg/typescript.svg";
import Footer from "./components/Footer";
import "./mainPage.scss";

interface ILink {
	icon: React.ComponentType<{}>; // любой тип компонента React
	description: string;
	href: string;
}

export default function Home() {
	const arrayOfLinks: ILink[] = [
		{ icon: Common, description: "Общие", href: "/" },
		{ icon: HTML, description: "HTML", href: "/" },
		{ icon: CSS, description: "CSS", href: "/" },
		{ icon: JS, description: "JavaScript", href: "/" },
		{ icon: TS, description: "TypeScript", href: "/" },
		{ icon: React, description: "React", href: "/" },
		{ icon: Redux, description: "Redux", href: "/" },
	];

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
									{/* <p className="descripion-for-link">{link.description}</p> */}
								</Link>
							</li>
						);
					})}
				</ul>
			</main>
			<Footer />
		</div>
	);
}
