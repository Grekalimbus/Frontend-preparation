import axios from "axios";

interface IProps {
	_id: string | undefined;
	typeOption: string;
	handleNextQuestion: () => void;
}
const useDeleteQuestion = ({ _id, typeOption, handleNextQuestion }: IProps) => {
	const deleteQuestion = async () => {
		if (_id) {
			try {
				const response = await axios.delete(
					`http://localhost:3000/api/${typeOption}Question?id=${_id}`
				);
				handleNextQuestion();
			} catch (error) {
				console.error("Error creating question:", error);
			}
		}
	};
	return { deleteQuestion };
};

export default useDeleteQuestion;
