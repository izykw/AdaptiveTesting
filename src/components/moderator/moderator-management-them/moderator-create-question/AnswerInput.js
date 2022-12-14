import React from 'react';

export function AnswerInput(props) {
	const {index, register, isCorrectAnswersCount, required} = props;
	return (
		<>
			<div className="d-flex align-items-center w-50">
				<label className="form-label">
					<input {...register(`is_correct[${index}]`,
						{validate: () => isCorrectAnswersCount || !required['is_correct']})}
								 type="checkbox"
								 className="form-check-input mt-lg-2 mt-1 me-lg-3 me-1"/>
				</label>
				<label className="form-label flex-grow-1">
					<input {...register(`answer[${index}]`,
						{required: required['answer']})}
								 type="text"
								 className="form-control mt-lg-2 mt-1"
								 placeholder="Введите вариант ответа"/>
				</label>
			</div>
		</>
	);
}

export const addAnswersInput = (count, isCorrectAnswersCount, handleForm) => {
	let answersInput = [];
	for (let i = 1; i <= count; i++) {
		answersInput.push(<AnswerInput
			key={i}
			index={i}
			isCorrectAnswersCount={isCorrectAnswersCount}
			{...handleForm}/>);
	}
	return answersInput;
};
