import axios from "axios";

interface IProps {
	_id: string | undefined;
	technology: string;
	handleNextQuestion: () => void;
}
const useDeleteQuestion = ({ _id, technology, handleNextQuestion }: IProps) => {
	const deleteQuestion = async () => {
		if (_id) {
			try {
				const response = await axios.delete(
					`http://localhost:3000/api/${technology}Question?id=${_id}`
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
