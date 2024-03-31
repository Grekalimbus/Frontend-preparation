import Link from "next/link";
import { arrayNavLinks } from "./interfaces/links";
import "./mainPage.scss";

export default function Home() {
	return (
		<main className="main-container-block">
			<h1>Вопросы с собеседований на Frontend разработчика</h1>
			<ul className="container-icon-technologies">
				{arrayNavLinks.map(link => {
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
