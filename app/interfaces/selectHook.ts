import { ISelectOptions } from "./selectOptions";

export interface ISelectHook {
	selectOption: ISelectOptions[];
	handleChangeTypeOption: (
		updateSelectValue: string,
		selectField: string
	) => unknown;
}
