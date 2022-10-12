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
		await axios.delete(`${this.URL}/questions`, ids);
	};

	postQuestion = async (question) => {
		await axios.post(`${this.URL}/questions/`, question);
	};

	// Themes
	getTheme = async (id) => {
		const res = await axios.get(`${this.URL}/themes/${id}`);
		return res.data;
	};

	getThemes = async () => {
		const res = await axios.get(`${this.URL}/themes`);
		return res.data.results;
	};

	deleteThemes = async (ids) => {
		await axios.delete(`${this.URL}/themes/`, ids);
	};

	postTheme = async (theme) => {
		await axios.post(`${this.URL}/themes/`, theme);
	};

	// Competencies
	getCompetencies = async () => {
		const res = await axios.get(`${this.URL}/competence`);
		return res.data;
	}

	// Users
	getUser = async (id) => {
		const res = await axios.get(`${this.URL}/users/${id}`);
		return res.data;
	};

	getUsers = async () => {
		return await axios.get(`${this.URL}/users`);
	};

	updateUser = async (user, id) => {
		await axios.put(`${this.URL}/users/${id}/`, user);
	};

	// Test result
	getTestResult = async (id) => {
		const res = await axios.get(`${this.URL}/test_result/${id}`);
		return res.data;
	};
}
