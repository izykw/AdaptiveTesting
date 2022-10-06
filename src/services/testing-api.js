import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.URL = 'http://localhost:8000';
	}

	getQuestion = async (pk) => {
		const res = await axios.get(`${this.URL}/questions/${pk}/`);
		return res.data;
	};

	getQuestions = async () => {
		const res = await axios.get(`${this.URL}/questions/`);
		return res.data;
	};

	getThemeQuestions = async (pk) => {
		const res = await axios.get(`${this.URL}/questions/?theme=${pk}/`);
		return res.data;
	};

	getTestQuestion = async (pk) => {
		return await axios.get(`${this.URL}/algorithm/${pk}/`);
	};

	getTestQuestions = async () => {
		return await axios.get(`${this.URL}/testing/`);
	};

	deleteQuestion = async (pk) => {
		await axios.delete(`${this.URL}/questions/${pk}/`);
	};

	postQuestion = async (question) => {
		await axios.post(`${this.URL}/questions/`, question);
	};

	getTheme = async (pk) => {
		const res = await axios.get(`${this.URL}/themes/${pk}/`);
		return res.data;
	};

	getThemes = async () => {
		const res = await axios.get(`${this.URL}/themes/`);
		return res.data.results;
	};

	deleteTheme = async (pk) => {
		await axios.delete(`${this.URL}/themes/${pk}/`);
	};

	postTheme = async (theme) => {
		await axios.post(`${this.URL}/themes/`, theme);
	};

	getUser = async (pk) => {
		const res = await axios.get(`${this.URL}/users/${pk}/`);
		return res.data;
	};

	getUsers = async () => {
		return await axios.get(`${this.URL}/users/`);
	};

	updateUser = async (user, userId) => {
		await axios.put(`${this.URL}/users/${userId}/`, user);
	};

	getTestResult = async (pk) => {
		const res = await axios.get(`${this.URL}/test_result/${pk}/`);
		return res.data;
	};

	postTestResult = async (pk, testingResult) => {
		await axios.post(`${this.URL}/testing_result/${pk}`, testingResult);
	};
}
