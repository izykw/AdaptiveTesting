import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.apiBase = 'http://localhost:8000';
	}

	getQuestion = async (pk) => {
		return await axios.get(`${this.apiBase}/questions/${pk}/`);
	};

	getQuestions = async () => {
		return await axios.get(`${this.apiBase}/questions/`);
	};

	getThemeQuestions = async (pk) => {
		return await axios.get(`${this.apiBase}/questions/?theme=${pk}`);
	};

	getTestQuestion = async (pk) => {
		return await axios.get(`${this.apiBase}/algorithm/${pk}/`);
	};

	getTestQuestions = async () => {
		return await axios.get(`${this.apiBase}/testing/`);
	};

	deleteQuestion = async (pk) => {
		return await axios.delete(`${this.apiBase}/questions/${pk}/`);
	};

	postQuestion = async (question) => {
		return await axios.post(`${this.apiBase}/questions/`, question);
	};

	getTheme = async (pk) => {
		return await axios.get(`${this.apiBase}/themes/${pk}/`);
	};

	getThemes = async () => {
		return await axios.get(`${this.apiBase}/themes/`);
	};

	deleteTheme = async (pk) => {
		return await axios.delete(`${this.apiBase}/themes/${pk}/`);
	};

	postTheme = async (theme) => {
		return await axios.post(`${this.apiBase}/themes/`, theme);
	};

	getUser = async (pk) => {
		return await axios.get(`${this.apiBase}/users/${pk}/`);
	};

	getUsers = async () => {
		return await axios.get(`${this.apiBase}/users/`);
	};

	updateUser = async (user, pk) => {
		return await axios.put(`${this.apiBase}/users/${pk}/`, user);
	};
}
