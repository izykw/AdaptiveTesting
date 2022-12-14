import React from 'react';

export function Answers({ type, answers = [] }) {
	const inputType = type === '1' ? 'radio' : 'checkbox';
	return (
		<ul className="list-group fs-5">
			{
				answers.map(({pk, answer}, i)  => {
					const name = type === '1' ? 'is_correct' : `is_correct[${i}]`
					return (
						<li key={pk} className="list-group-item border-0">
							<label>
								<input type={inputType}
											 id={pk}
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