import SelectOption from "./SelectOption";
import propsInSelectComponent from "./propsInSelectComponent";

type Props = {
	params: {
		id: string;
	};
};

const Questions = ({ params: { id } }: Props) => {
	return (
		<main>
			<h2>{id} Вопросы</h2>
			{propsInSelectComponent.map(item => {
				return (
					<SelectOption
						key={item.label}
						label={item.label}
						typeOption={item.typeOption}
						options={item.options}
					/>
				);
			})}
			<p>
				Прогрессивное улучшение, изящная деградация, что это? <span>I</span>
			</p>
			<p>
				Это две стратегии веб-разработки, которые подразумевают поэтапное
				создание веб-страниц с учетом возможностей и ограничений различных
				браузеров и устройств. Прогрессивное улучшение - это метод, при котором
				веб-сайт создается сначала для базового уровня функциональности, а затем
				улучшается с добавлением более сложных возможностей. Изящная деградация
				- это подход, при котором веб-сайт создается сначала для более сложных
				возможностей, а затем плавно деградирует до более простых версий.
			</p>
			<button>Next</button>
		</main>
	);
};

export default Questions;
