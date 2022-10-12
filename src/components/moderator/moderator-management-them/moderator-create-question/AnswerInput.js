import React from 'react';

export function AnswerInput({index}) {
	return (
		<div className="d-flex align-items-center">
			<label className="form-label me-lg-3 me-1">
				<input name={`${index}-checkbox`} type="checkbox" className="form-check-input"/>
			</label>
			<label className="form-label flex-grow-1">
				<input name={`${index}-answer`} type="text" className="form-control my-lg-3 my-1"/>
			</label>
		</div>
	);
}

export const addAnswersInput = (count) => {
	let answersInput = [];
	for (let i = 1; i <= count; i++) {
		answersInput.push(<AnswerInput key={i} index={i}/>);
	}
	return answersInput;
}