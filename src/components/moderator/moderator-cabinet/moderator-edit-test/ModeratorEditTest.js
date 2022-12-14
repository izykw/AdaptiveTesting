import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../../second-components/wrapper/Wrapper';
import Header from '../../../header/Header';
import ModeratorCreateTest from '../moderator-create-test/ModeratorCreateTest';
import { Container } from 'reactstrap';
import TestingApi from '../../../../services/testingApi';

export default function ModeratorEditTest() {
	const { testSettingsId } = useParams();
	const [testSettings, setTestSettings] = useState(null);

	useEffect(() => {
		const api = new TestingApi();
		api.getTestSettingsById(testSettingsId).then(res => setTestSettings(res));
	}, [testSettingsId]);

	console.log(testSettings);

	return (
		<Wrapper>
			<Header title="Редактирование теста" isFluid={false}/>
			<Container className="shadow_element flex-grow-1 bg-light border border-2 rounded-3">
				{testSettings !== null &&
					<ModeratorCreateTest testSettings={testSettings}/>}
			</Container>
		</Wrapper>
	);
}