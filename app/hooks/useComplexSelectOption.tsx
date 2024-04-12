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
	console.log("initialOptions", initialOptions);
	const handleChangeTypeOption = (
		updateSelectValue: string,
		selectField: string
	) => {
		const updateSelectOptions = selectOption.map(item => {
			// console.log("updateSelectValue", updateSelectValue);
			if (item.typeOption === selectField) {
				return {
					typeOption: updateSelectValue,
					options: item.options,
				};
			}
			return item;
		});
		// console.log("updateSelectOptions", updateSelectOptions);
		setSelectOption(updateSelectOptions);
	};
	return { selectOption, handleChangeTypeOption };
};

export default useComplexSelectOption;
