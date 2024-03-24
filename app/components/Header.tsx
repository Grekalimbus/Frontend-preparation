import Link from "next/link";
import "./header.scss";

const Header = () => {
	return (
		<header className="header">
			<Link href={"/"} className="link-to-home">
				Главная
			</Link>
		</header>
	);
};

export default Header;
