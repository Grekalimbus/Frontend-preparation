import { useState } from "react";
import {
	ISelectOptions,
	initialTechnologies,
} from "../interfaces/selectOptions";

const useComplexSelectOption = () => {
	const [selectOption, setSelectOption] =
		useState<ISelectOptions[]>(initialTechnologies);

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
