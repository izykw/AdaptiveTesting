import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, ListGroup, Row } from 'reactstrap';
import { ListItemInput } from './ListItemInput';
import { ListItemSelect } from './ListItemSelect';
import { getHandleFormSettings, } from './moderatorCreateTest.services';
import {
	convertTimeToSeconds, convertToCorrectTime
} from '../../../../services/services';
import TestingApi from '../../../../services/testingApi';

export default function ModeratorCreateTest({ testSettings: defaultSettings }) {
	const navigate = useNavigate();

	const [competencies, setCompetencies] = useState([]);
	const [levels, setLevels] = useState([]);

	const defaultValues = {
		competence_id: defaultSettings?.competence_id ?? '',
		level_id: defaultSettings?.level_id ?? '',
		name: defaultSettings?.name ?? '',
		time: convertTimeToSeconds(defaultSettings?.time) / 60 ?? '',
		questions_count: defaultSettings?.questions_count ?? '',
		next_level_score: defaultSettings?.next_level_score ?? '',
	};

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitSuccessful },
		reset
	} = useForm({ reValidateMode: 'onBlur', defaultValues: defaultValues, });

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const competencies = await api.getCompetencies();
			const levels = await api.getLevels();
			return {
				competencies: competencies.results,
				levels: levels.results,
			};
		};
		fetchData().then(({ competencies, levels }) => {
			setCompetencies(competencies);
			setLevels(levels);
		});
	}, []);

	useEffect(() => {
		if (isSubmitSuccessful) {
			defaultSettings ? navigate('/moderator/test-list') : reset();
		}
	}, [isSubmitSuccessful]);

	const postTestSettings = (data) => {
		const api = new TestingApi();
		const time = convertToCorrectTime(data.time * 60);
		const requestData = { ...data, time };
		console.log(requestData);
		if (defaultSettings?.id) {
			api.updateTestSettings(defaultSettings.id, requestData)
				.catch(e => console.error(e.message));
		} else {
			api.postTestSettings(requestData).catch(e => console.error(e.message));
		}
	};

	const handleForm = getHandleFormSettings(register);

	return (
		<Row>
			<form onSubmit={handleSubmit(postTestSettings)}
						className="d-flex flex-column mt-3">
				<ListGroup>
					<ListItemSelect title="Выбор компетенции"
													options={competencies}
													defaultValue={defaultValues?.competence_id}
													register={handleForm.competence_id}
													errors={errors?.competence_id}/>
					<ListItemSelect title="Выбор начального уровня"
													options={levels}
													defaultValue={defaultValues?.level_id}
													register={handleForm.level_id}
													errors={errors?.level_id}/>
					<ListItemInput type="text"
												 title="Название теста"
												 placeholder="Введите название"
												 width="100"
												 register={handleForm.name}
												 errors={errors?.name}/>
					<ListItemInput type="number"
												 title="Длительность теста в минутах"
												 placeholder="180"
												 width="25"
												 register={handleForm.time}
												 errors={errors?.time}/>
					<ListItemInput type="number"
												 title="Количество вопросов"
												 placeholder="150"
												 width="25"
												 register={handleForm.questions_count}
												 errors={errors?.questions_count}/>
					<ListItemInput type="number"
												 title="Пороговый балл"
												 placeholder="40"
												 width="25"
												 register={handleForm.next_level_score}
												 errors={errors?.next_level_score}/>
				</ListGroup>
				<Button color="light"
								type="submit"
								className="bg-transparent border border-2 w-75 mx-auto mt-4">
					Добавить тест
				</Button>
			</form>
		</Row>);
}
