import React from 'react';
import PersonalInfo from '../../second-components/personal-info/PersonalInfo';
import usePersonInfo from '../../../hooks/use-person-info/usePersonInfo';

export default function UserInfo() {
	const [info, setInfo] = usePersonInfo(1);

	return (<PersonalInfo info={info} updateInfo={setInfo}/>);
}

