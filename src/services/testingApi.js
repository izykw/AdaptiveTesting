import axios from 'axios';

export default class TestingApi {
	constructor() {
		this.URL = 'http://localhost:8000';
	}

	// Questions
	getQuestion = async (id, token) => {
		const res = await axios.get(`${this.URL}/questions/${id}`,
			{ headers: { Authorization: `Bearer ${token}` } });
		return res.data;
	};

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
	getUser = async (token) => {
		const res = await axios.get(`${this.URL}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return res.data;
	};

	updateUser = async (user, token) => {
		return await axios.put(`${this.URL}/me`, user, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
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

	getTestSettings = async (id) => {
		const res = await axios.get(`${this.URL}/test_settings?id=${id}`);
		return res.data;
	};

	updateTestSettings = async (id, data) => {
		return await axios.put(`${this.URL}/test_settings/${id}`, data);
	};

	// Testing
	getTestingQuestions = async (id, token) => {
		const res = await axios.get(`${this.URL}/test?id=${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
		return res.data;
	};

	postTestingAnswers = async (id, answers, token) => {
		return await axios.post(`${this.URL}/test?id=${id}`, answers, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		});
	};

	// Authorization
	authorization = async (data) => {
		const res = await axios.post(`${this.URL}/api/token/`, data);
		return res.data;
	};
}
