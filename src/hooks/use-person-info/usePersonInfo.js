import {useState, useEffect} from 'react';
import TestingApi from '../../services/testingApi';
import { getToken } from '../../services/getToken';


export default function usePersonInfo() {
	const [info, setInfo] = useState({});

	useEffect(() => {
		try {
			const token = getToken();
			const api = new TestingApi();
			api.getUser(token).then((user) => setInfo(user.user));
		} catch (e) {
			console.error(e.message)
		}
	}, []);

	const updateInfo = (newData) => {
		setInfo((prevData) => ({
			...prevData,
			...newData
		}));
	};

	return [info, updateInfo];
}