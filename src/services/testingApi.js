import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.URL = 'http://localhost:8000';
	}

	// Authorization
	authorization = async (user) => {
		return await fetch(`${this.URL}/login/`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(user),
		});
	};

	// Questions
	getThemeQuestions = async (id) => {
		const res = await axios.get(`${this.URL}/questions?theme=${id}`);
		return res.data;
	};

	deleteQuestions = async (ids) => {
		return await axios.delete(`${this.URL}/questions`, { data: ids });
	};

	postQuestion = async (question) => {
		return await axios.post(`${this.URL}/questions`, question);
	};

	// Themes

	getThemes = async () => {
		const res = await axios.get(`${this.URL}/themes`);
		return res.data;
	};

	getCompetenceThemes = async (id) => {
		const res = await axios.get(`${this.URL}/themes?competence=${id}`);
		return res.data;
	};

	deleteThemes = async (ids) => {
		return await axios.delete(`${this.URL}/themes`, {
			data: ids,
		});
	};

	postTheme = async ({ theme, id }) => {
		return await axios.post(`${this.URL}/themes`, {
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
		return await axios.delete(`${this.URL}/competence`, { data: ids });
	};

	postCompetence = async (competence) => {
		return await axios.post(`${this.URL}/competence`, {
			competence
		});
	};

	// Users
	getUser = async () => {
		const res = await axios.get(`${this.URL}/profile`,);
		return res.data;
	};

	updateUser = async (user, id) => {
		return await axios.put(`${this.URL}/users/${id}`, user);
	};

	// Test result
	getTestResult = async (id) => {
		const res = await axios.get(`${this.URL}/test_result/${id}`);
		return res.data;
	};

	// Levels
	getLevels = async () => {
		const res = await axios.get(`${this.URL}/level`);
		return res.data;
	};

	// Test settings
	postTestSettings = async (data) => {
		return await axios.post(`${this.URL}/test_settings`, data);
	};

	getTestSettings = async () => {
		const res = await axios.get(`${this.URL}/test_settings`);
		return res.data;
	};

	// Testing
	getTestingQuestions = async (id) => {
		const res = await axios.get(`${this.URL}/test?id=${1}`);
		return res.data;
	};

	postTestingAnswers = async (id, answers) => {
		return await axios.post(`${this.URL}/test?id=${id}`, answers);
	};
}
