import { useEffect, useState } from "react";
import { ISelectOptions } from "../interfaces/selectOptions";

const useComplexSelectOption = (initialOptions: ISelectOptions[]) => {
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialOptions);
	useEffect(() => {
		if (initialOptions[0].typeOption !== "") {
			setSelectOption(initialOptions);
		}
	}, [initialOptions[0].typeOption]);
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
