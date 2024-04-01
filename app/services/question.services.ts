import axios from "axios";
import IQuestion from "../interfaces/question";

class QuestionService {
	private URL = "http://localhost:3000/api/";

	async getQuestionByType(type: string) {
		return axios.get<Record<string, IQuestion[]>>(`${this.URL + type}Question`);
	}

	async deleteQuestion(_id: string | undefined, typeOption: string) {
		return axios.delete(
			`http://localhost:3000/api/${typeOption}Question?id=${_id}`
		);
	}
}

export default new QuestionService();
