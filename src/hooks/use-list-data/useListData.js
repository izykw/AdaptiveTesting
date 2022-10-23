import { useState } from 'react';

export default function useListData(initData) {
	const [data, setData] = useState(initData);

	const updateData = (newData) => {
		let value;
		if(typeof newData === 'function') {
			value = {...data,...newData(data)}
		} else {
			value = {...data,...newData};
		}
		setData(value);
	};

	return [data, updateData];
}