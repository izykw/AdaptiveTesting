export function getHandleFormSettings(register) {
	return {
		competence: register('competence_id',
			{ required: 'Пожалуйста, выберите компетенцию' }),
		level: register('level_id', { required: 'Пожалуйста, выберите уровень' }),
		testName: register('name', { required: 'Пожалуйста, введите название теста' }),
		testTime: register('time',
			{
				required: 'Пожалуйста, установите длительность теста',
				max: { value: 240, message: 'Максимальная длительность теста 240мин' },
				min: {
					value: 5,
					message: 'Длительность теста не может быть меньше 5мин'
				}
			}),
		questionsCount: register('questions_count',
			{
				required: 'Пожалуйста, установите нужное количество вопросов',
				max: { value: 50, message: 'Максимальное количество вопросов 50' },
				min: { value: 1, message: 'Минимальное количество вопросов 1' }
			}),
		nextLevelScore: register('next_level_score',
			{
				required: 'Пожалуйста, установите пороговый балл',
				max: {
					value: 100,
					message: 'Максимальный возможный пороговый балл 100'
				},
				min: { value: 1, message: 'Минимальный возможный пороговый балл 1' }
			}),
	};
}