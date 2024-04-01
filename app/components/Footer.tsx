import Link from "next/link";
import { arrayFooterLinks } from "../interfaces/links";
import "./styles/footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<ul className="container-personal-links">
				{arrayFooterLinks.map(link => {
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
