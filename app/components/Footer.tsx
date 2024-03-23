import Link from "next/link";
import gitHub from "../assets/svg/gitHub.svg";
import instagram from "../assets/svg/instagram.svg";
import telegram from "../assets/svg/telegram.svg";
import "./footer.scss";

interface ILink {
	icon: React.ComponentType<{}>; // любой тип компонента React
	href: string;
	description: string;
}
const Footer = () => {
	const arrayOfLinks: ILink[] = [
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
	return (
		<footer className="footer">
			<ul className="container-personal-links">
				{arrayOfLinks.map(link => {
					return (
						<li key={link.href}>
							<Link
								href={link.href}
								aria-label={link.description}
								target="blank"
							>
								<link.icon />
							</Link>
						</li>
					);
				})}
			</ul>
		</footer>
	);
};

export default Footer;
