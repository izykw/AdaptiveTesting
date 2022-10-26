import {useState, useEffect} from 'react';
import TestingApi from '../../services/testingApi';


export default function usePersonInfo(token) {
	const [info, setInfo] = useState({});

	useEffect(() => {
		console.log(token);
		const api = new TestingApi();
		api.getUser(token).then((user) => {
			setInfo(user);
		});
	}, []);

	const updateInfo = (newData) => {
		setInfo((prevData) => ({
			...prevData,
			...newData
		}));
	};

	return [info, updateInfo];
}