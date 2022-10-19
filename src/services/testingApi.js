import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.URL = 'http://localhost:8000';
	}

	// Questions
	getQuestion = async (id) => {
		const res = await axios.get(`${this.URL}/questions/${id}`);
		return res.data;
	};

	getQuestions = async () => {
		const res = await axios.get(`${this.URL}/questions`);
		return res.data;
	};

	getThemeQuestions = async (id) => {
		const res = await axios.get(`${this.URL}/questions?theme=${id}`);
		return res.data;
	};

	getTestQuestion = async (id) => {
		return await axios.get(`${this.URL}/algorithm/${id}`);
	};

	getTestQuestions = async () => {
		return await axios.get(`${this.URL}/testing`);
	};

	deleteQuestions = async (ids) => {
		await axios.delete(`${this.URL}/questions`, {data: ids});
	};

	postQuestion = async (question) => {
		await axios.post(`${this.URL}/questions`, question);
	};

	// Themes
	getTheme = async (id) => {
		const res = await axios.get(`${this.URL}/themes/${id}`);
		return res.data;
	};

	getThemes = async () => {
		const res = await axios.get(`${this.URL}/themes`);
		return res.data;
	};

	getCompetenceThemes = async (id) => {
		const res = await axios.get(`${this.URL}/themes?competence=${id}`)
		return res.data;
	}

	deleteThemes = async (ids) => {
		await axios.delete(`${this.URL}/themes`, {
			data: ids,
		});
	};

	postTheme = async ({theme, id}) => {
		console.log(theme)
		await axios.post(`${this.URL}/themes`, {
			name: theme,
			competence: id
		});
	};

	// Competencies
	getCompetencies = async () => {
		const res = await axios.get(`${this.URL}/competence`);
		return res.data;
	};

	deleteCompetencies = async (ids) => {
		await axios.delete(`${this.URL}/competence`, {data: ids});
	};

	postCompetence = async (competence) => {
		await axios.post(`${this.URL}/competence`, {
			competence
		});
	};

	// Users
	getUser = async (id) => {
		const res = await axios.get(`${this.URL}/users/${id}`);
		return res.data;
	};

	getUsers = async () => {
		return await axios.get(`${this.URL}/users`);
	};

	updateUser = async (user, id) => {
		await axios.put(`${this.URL}/users/${id}`, user);
	};

	// Test result
	getTestResult = async (id) => {
		const res = await axios.get(`${this.URL}/test_result/${id}`);
		return res.data;
	};

	getLevels = async () => {
		const res = await axios.get(`${this.URL}/level`);
		return res.data;
	};
}
