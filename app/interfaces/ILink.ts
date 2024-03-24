export default interface ILink {
	icon: React.ComponentType<{}>; // любой тип компонента React
	description: string;
	href: string;
}
