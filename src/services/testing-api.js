import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.URL = 'http://localhost:8000';
	}

	getQuestion = async (pk) => {
		return await axios.get(`${this.URL}/questions/${pk}`);
	};

	getQuestions = async () => {
		return await axios.get(`${this.URL}/questions`);
	};

	getThemeQuestions = async (pk) => {
		return await axios.get(`${this.URL}/questions/?theme=${pk}`);
	};

	getTestQuestion = async (pk) => {
		return await axios.get(`${this.URL}/algorithm/${pk}`);
	};

	getTestQuestions = async () => {
		return await axios.get(`${this.URL}/testing`);
	};

	deleteQuestion = async (pk) => {
		await axios.delete(`${this.URL}/questions/${pk}`);
	};

	postQuestion = async (question) => {
		await axios.post(`${this.URL}/questions`, question);
	};

	getTheme = async (pk) => {
		return await axios.get(`${this.URL}/themes/${pk}`);
	};

	getThemes = async () => {
		return await axios.get(`${this.URL}/themes`);
	};

	deleteTheme = async (pk) => {
		await axios.delete(`${this.URL}/themes/${pk}`);
	};

	postTheme = async (theme) => {
		await axios.post(`${this.URL}/themes`, theme);
	};

	getUser = async (pk) => {
		const res = await axios.get(`${this.URL}/users/${pk}/`);
		return res.data;
	};

	getUsers = async () => {
		return await axios.get(`${this.URL}/users`);
	};

	updateUser = async (user, pk) => {
		await axios.put(`${this.URL}/users/${pk}`, user);
	};

	getTestResult = async (pk) => {
		const res = await axios.get(`${this.URL}/test_result/${pk}/`);
		return res.data;
	};

	postTestResult = async (pk, testingResult) => {
		await axios.post(`${this.URL}/testing_result/${pk}`, testingResult);
	};
}
