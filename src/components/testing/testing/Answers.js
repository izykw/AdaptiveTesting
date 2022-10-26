import React from 'react';

export function Answers({ type, answers = [] }) {
	const inputType = type === '1' ? 'radio' : 'checkbox';
	return (
		<ul className="list-group fs-5">
			{
				answers.map(({pk, answer})  => {
					const name = type === '1' ? 'answer' : `answer[i]`
					return (
						<li key={pk} className="list-group-item border-0">
							<label>
								<input type={inputType}
											 name={name}
											 className="form-check-input shadow_custom"/>
								<span className="ms-2 text-primary">{answer}</span>
							</label>
						</li>
					);
				})
			}
		</ul>
	);
}