const useComplexVisible = (textSelectOption: string) => {
	const checkVisibleForTextAndFilter = () =>
		!(
			textSelectOption === "Выбирете: Удалить /Изменить / Добавить" ||
			textSelectOption === "Добавить"
		);

	const isVisibleElem = checkVisibleForTextAndFilter();
	return { isVisibleElem, textSelectOption };
};

export default useComplexVisible;
