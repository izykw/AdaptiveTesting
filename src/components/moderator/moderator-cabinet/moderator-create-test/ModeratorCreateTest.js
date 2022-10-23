import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ListGroup, Row } from 'reactstrap';
import { ListItemInput } from './ListItemInput';
import { ListItemSelect } from './ListItemSelect';
import TestingApi from '../../../../services/testingApi';
import { postTestSettings } from './moderatorCreateTest.services';

export default function ModeratorCreateTest() {
	const {
		handleSubmit,
		watch,
		register,
		formState: {errors, isSubmitSuccessful},
		reset
	} = useForm({
		reValidateMode: 'onBlur',
		defaultValues: {
			competence: '',
			theme: '',
			testName: '',
			testTime: 0,
			questionsCount: 0,
			thresholdScore: 0,
		}
	});

	const watchCompetence = watch('competence');

	const [competencies, setCompetencies] = useState([]);
	const [themes, setThemes] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const competencies = await api.getCompetencies();
			return {
				competencies: competencies.results,
			};
		};
		fetchData().then(({competencies}) => {
			setCompetencies(competencies);
		});
	}, []);

	useEffect(() => {
		const api = new TestingApi();
		api.getCompetenceThemes(watchCompetence)
			.then(competencies => setThemes(competencies));
	}, [watchCompetence]);

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);



	const handleForm = {
		competence: register('competence',
			{required: 'Пожалуйста, выберите компетенцию'}),
		theme: register('theme', {required: 'Пожалуйста, выберите тему'}),
		testName: register('testName',
			{required: 'Пожалуйста, введите название теста'}),
		testTime: register('testTime',
			{
				required: 'Пожалуйста, установите длительность теста',
				max: {value: 240, message: 'Максимальная длительность теста 240мин'},
				min: {value: 5, message: 'Длительность теста не может быть меньше 5мин'}
			}),
		questionsCount: register('questionsCount',
			{
				required: 'Пожалуйста, установите нужное количество вопросов',
				max: {value: 50, message: 'Максимальное количество вопросов 50'},
				min: {value: 1, message: 'Минимальное количество вопросов 1'}
			}),
		thresholdScore: register('thresholdScore',
			{
				required: 'Пожалуйста, установите пороговый балл',
				max: {value: 100, message: 'Максимальный возможный пороговый балл 100'},
				min: {value: 1, message: 'Минимальный возможный пороговый балл 1'}
			}),
	};

	return (
		<Row>
			<form onSubmit={handleSubmit(postTestSettings)}
						className="d-flex flex-column mt-3">
				<ListGroup>
					<ListItemSelect title="Выбор компетенции"
													options={competencies}
													register={handleForm.competence}
													errors={errors?.competence}/>
					<ListItemSelect title="Выбор темы"
													options={themes}
													register={handleForm.theme}
													errors={errors?.theme}/>
					<ListItemInput type="text"
												 title="Название теста"
												 placeholder="Введите название"
												 width="100"
												 register={handleForm.testName}
												 errors={errors?.testName}/>
					<ListItemInput type="number"
												 title="Длительность теста в минутах"
												 placeholder="180"
												 width="25"
												 register={handleForm.testTime}
												 errors={errors?.testTime}/>
					<ListItemInput type="number"
												 title="Количество вопросов"
												 placeholder="150"
												 width="25"
												 register={handleForm.questionsCount}
												 errors={errors?.questionsCount}/>
					<ListItemInput type="number"
												 title="Пороговый балл"
												 placeholder="40"
												 width="25"
												 register={handleForm.thresholdScore}
												 errors={errors?.thresholdScore}/>
				</ListGroup>
				<Button color="light"
								type="submit"
								className="bg-transparent border border-2 w-75 mx-auto mt-4">
					Добавить тест
				</Button>
			</form>
		</Row>);
}