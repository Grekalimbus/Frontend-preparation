# **Frontend Preparation**

## [Click > link deploy project / Ссылка на проект](https://frontend-preparation-gamma.vercel.app/)

<br />

### About this project

## RU

Проект, который представляет собой шпаргалку по вопросам с собеседования.
На сайте можно выбрать тему, по которой будут вопросы.
После выбора темы, например это JavaScript, пользователь попадает на страницу с вопросами, где грузятся данные с сервера.

Пользователь может фильтровать вопросы по категории, сортировать (например в рандомном порядке или с конца). Также есть фильтрация, чтобы быстро найти вопрос.
Пользователь всегда видит только 1 вопрос на экране, но он может скипать с их с одного на другой с помощью кнопки, или использовать методы фильтров.
Также пользователь изначально не видит ответа на вопрос. Ответ можно показать или скрыть.

Также есть админ панель, на которую нет редиректа по навигации. Перейти на страницу можно исключительно вручную прописав нужный URL.
На админ пенеле очень много функционала, переиспользуемых компонентов и хуков. Страница очень насыщенна логикой и интерактивом. Доступ к админке также защищен паролем. Инструменты администратора доступны только после ввода правильного пароля.
На админ панеле идёт основное взаимодействие с БД, т.к администратор удаляет вопросы по конкретной теме, изменяет их и добавляет новые.

Архитектуры приложения на половину серверная, на половину клиентская.
Где есть интерактив = client components

## ENG

A project that is a cheat sheet of interview questions.
On the site you can select a topic on which there will be questions.
After selecting a topic, e.g. JavaScript, the user is taken to a page with questions, where data from the server is loaded.

The user can filter the questions by category, sort them (e.g. in random order or from the end). There is also filtering to quickly find a question.
The user always sees only 1 question on the screen, but they can skip from one to another with a button, or use filter methods.
Also the user does not initially see the answer to the question. The answer can be shown or hidden.

There is also an admin panel, to which there is no redirect on navigation. You can go to the page only manually by writing the desired URL.
The admin panel has a lot of functionality, reuseble components and hooks. The page is very rich in logic and interactivity. Access to the admin panel is also password protected. Admin tools are available only after entering the correct password.
The admin panel is where the main interaction with the database takes place, as the administrator deletes questions on a particular topic, modifies them and adds new ones.

The architecture of the application is half server and half client.
Where there is interactivity = client components

<br />

### Used tehnolohy

    NextJS
    TanStack / React-query
    TypeScript
    MongoDB + mongoose
    CSS

<br />

## Сложности возникшие на этапе разработки

1. Смена курса.
   Во время разработки, нашлось решение лучше, чем из оригинального дизайна и логика приложения также пошла немного в другую сторону. Этот процесс потребовал больше времени чем было запланировано.
   Потери: Время
   Выгоды: Более лучший UI и повышение пользовательского опыта.

2. Выбор библиотеки.
   Изначально хотел использовать Redux-toolkit, т.к востребован на рынке и хотелось освежить знания. Написал базовую логику на редаксе в связке с Next.js 14-й версии (там свои тонкости). После этого понял, что решение было не оптимальным в этом приложении. Сделал определенные выводы и принял решение использовать React-query.

3. Типизация.
   Я в основном писал на обычном JS, но решил полностью свичнуться на TS. В связи с этим процесс типизации также повлиял на время разработки, Опыт с TS был, но давно. Не назову переход на TS сложностью, но в скорости он меня ограничил.

4. Клиент сервер.
   Изначально схемы/models были написаны не совсем корректно. В связи с этим были проблемы с запросами и они не были стабильными. Часто приходилось рестартать приложение. Моя ошибка была в том, что не решил ошибку раньше. Проблема со схемами тормозила процесс разработки, поэтому нужно было решить проблему раньше. Это не было критично. Спустя недолгое время, пошел разбираться из-за чего возникает проблема с запросами и нашел проблему в схемах/models. Пофиксил проблему и перешел от боли к удовольствию.

5. Разделение логики.
   Логика в приложении росла и пришлось создавать кастомные хуки, менять логику в компонентах и пропсах, делать переиспользуемый и масштабируемый код.
   Какие-то хуки пришлось делать универсальными, какие-то нужно было делать индивидуальными.
   На странице много интерактива и компонентов, которые могут зависеть друг от друга. Пришлось рефакторить логику так, чтобы компоненты при своей сложности сохраняли независимость, чтобы их можно было использовать в других частях приложения. В каких-то хуках есть запросы к БД и нужно иметь возможность доступа к данным по определенным тригерам. Большое разделение логики также требует типизации.
   <br />
   <br />

## Code examples

### useComplexSelectOption.tsx

[app/hooks/useComplexSelectOption.tsx](https://github.com/Grekalimbus/Frontend-preparation/blob/main/app/hooks/useComplexSelectOption.tsx)

```js
const useComplexSelectOption = (initialOptions: ISelectOptions[]) => {
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialOptions);

	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOption.map(item => {
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});

		setSelectOption(updateSelectOptions);
	};
	return { selectOption, handleChangeTypeOption };
};

export default useComplexSelectOption;
```

<br />

### useInput.tsx + validate logic

[app/hooks/useInput.tsx](https://github.com/Grekalimbus/TZ-minsk-client/blob/main/services/users.service.ts)

```js
interface IDataInput {
	[key: string]: string;
}

interface IProps {
	initialValue: IDataInput;
}

const useInput = ({ initialValue }: IProps) => {
	const [errors, setErrors] = useState < IDataInput > {};
	const [inputValue, setInputValue] = useState < IDataInput > initialValue;

	const validate = () => {
		const errors = validator(inputValue, validatorConfig);
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};

	useEffect(() => {
		validate();
	}, [inputValue]);

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return {
		errors,
		inputValue,
		handleChangeInput,
		handleChangeTextArea,
		setInputValue,
	};
};

export default useInput;
```

<br />

### useQuestionFetch.tsx

[app/hooks/useQuestionFetch.tsx](https://github.com/Grekalimbus/Frontend-preparation/blob/main/app/hooks/useQuestionFetch.tsx)

```js
const arrayTachnologies = [
	"common",
	"css",
	"html",
	"javascript",
	"typescript",
	"react",
	"redux",
];

export const useQuestionFetch = (id: string) => {
	const [dataQuestion, setDataQuestion] = useState<IQuestion[]>([]);
	const [randomItem, setRandomItem] = useState<IQuestion | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await QuestionService.getQuestionByType(id);
				const questions = response.data[id];

				setDataQuestion(questions);

				if (!randomItem && questions.length > 0) {
					const randomIndex = Math.floor(Math.random() * questions.length);
					setRandomItem(questions[randomIndex]);
				}
				if (questions.length === 0) {
					setRandomItem(null);
				}
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		if (arrayTachnologies.includes(id)) {
			fetchData();
		}
	}, [id]);

	const handleNextQuestion = (): void => {
		if (dataQuestion.length > 0) {
			const nextQuestion = dataQuestion[0];
			setRandomItem(nextQuestion);
			setDataQuestion(prevData => prevData.slice(1));
		}
		if (dataQuestion.length === 0) {
			setRandomItem(null);
			setDataQuestion(prevData => prevData.slice(1));
		}
	};

	return { randomItem, handleNextQuestion };
};
```

<br />

### Compontents

[app/adminpanel/page.tsx](https://github.com/Grekalimbus/Frontend-preparation/blob/main/app/adminPanel/page.tsx)

```js
const page = () => {
	const [inputValue, setInputValue] = useState < string > "";
	const { isAccess, handleCheckPassword } = useAccess({
		inputValue,
		setInputValue,
	});

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<main className="container-preparation-wrapper">
			<section className="container-admin-panel">
				<PasswordSection
					isAccess={isAccess}
					inputValue={inputValue}
					handleChangeInput={handleChangeInput}
					handleCheckPassword={handleCheckPassword}
				/>
				<AccessSection
					isAccess={isAccess}
					handleChangeInput={handleChangeInput}
					inputValue={inputValue}
				/>
			</section>
		</main>
	);
};

export default page;
```

[app/adminPanel/AccessSection.tsx](https://github.com/Grekalimbus/Frontend-preparation/blob/main/app/adminPanel/AccessSection.tsx)

```js
interface IProps {
	isAccess: boolean;
	inputValue: string;
	handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccessSection = ({ isAccess, handleChangeInput, inputValue }: IProps) => {
	const { selectOption, handleChangeTypeOption } =
		useSelectOption(initialAdminOptions);
	const selectTechnologies: ISelectHook =
		useComplexSelectOption(initialTechnologies);
	const { isVisibleElem, textSelectOption } = useComplexVisible(
		selectOption[0].typeOption
	);
	return (
		isAccess && (
			<>
				{selectOption.map((item: ISelectOptions) => {
					return (
						<SelectOption
							key={item.typeOption}
							typeOption={item.typeOption}
							options={item.options}
							handleChangeTypeOption={handleChangeTypeOption}
							width={{ width: "100%" }}
						/>
					);
				})}
				{selectTechnologies.selectOption.map((item: ISelectOptions) => (
					<SelectOption
						width={{ width: "100%" }}
						key={item.typeOption}
						typeOption={item.typeOption}
						options={item.options}
						handleChangeTypeOption={selectTechnologies.handleChangeTypeOption}
					/>
				))}
				<section>
					<DeleteQuestion
						isVisibleElem={isVisibleElem}
						typeOption={selectTechnologies.selectOption[0].typeOption}
						inputValue={inputValue}
						handleChangeInput={handleChangeInput}
					/>

					<AddQuestion
						textSelectOption={textSelectOption}
						selectTechnologies={selectTechnologies.selectOption}
					/>
				</section>
			</>
		)
	);
};

export default AccessSection;
```
