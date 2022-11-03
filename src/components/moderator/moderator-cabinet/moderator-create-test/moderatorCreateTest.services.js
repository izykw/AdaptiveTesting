export function getHandleFormSettings(register) {
	return {
		competence: register('competence', {required: 'Пожалуйста, выберите компетенцию'}),
		level: register('level', {required: 'Пожалуйста, выберите уровень'}),
		testName: register('testName', {required: 'Пожалуйста, введите название теста'}),
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
}