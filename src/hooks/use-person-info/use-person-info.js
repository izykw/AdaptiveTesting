import {useState, useEffect} from 'react';
import TestingApi from '../../services/testing-api';


export default function usePersonInfo(pk) {
	const api = new TestingApi();
	const [info, setInfo] = useState({});

	useEffect(() => {
		api.getUser(pk).then(({data}) => {
			setInfo(data);
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