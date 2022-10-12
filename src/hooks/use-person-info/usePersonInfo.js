import {useState, useEffect} from 'react';
import TestingApi from '../../services/testingApi';


export default function usePersonInfo(pk) {
	const [info, setInfo] = useState({});

	useEffect(() => {
		const api = new TestingApi();
		api.getUser(pk).then((user) => {
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