import React from 'react';
import PersonalInfo from '../../second-components/personal-info/personal-info';
import usePersonInfo from '../../../hooks/use-person-info/use-person-info';

export default function UserInfo() {
	const [info, setInfo] = usePersonInfo(1);

	return (<PersonalInfo info={info} updateInfo={setInfo}/>);
}

