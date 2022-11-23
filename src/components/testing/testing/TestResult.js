import React from 'react';
import { Row } from 'reactstrap';
import {
	convertTimeToSeconds,
	convertToCorrectTime
} from "../../../services/services";

export function TestResult({ testResult }) {
	const {
		correct_answers,
		question_summary,
		wrong_questions,
		time_spent,
		time_summary,
		level,
	} = testResult;

	console.log(testResult);


	const timeLeft = convertToCorrectTime(convertTimeToSeconds(time_summary) -
		convertTimeToSeconds(time_spent));
	const questionsProgress = Math.round(correct_answers / question_summary * 100);
	const timeProgress = Math.round(
		convertTimeToSeconds(time_spent) / convertTimeToSeconds(time_summary) *
		100);
	return (
		<div className="p-5">
			<Row className="fs-5 mb-lg-5 mb-3">
				<div>
					<h3 className="text-primary">Прогресс - {questionsProgress}%</h3>
					<div className="d-flex align-items-center">
						<ProgressBar progressFill="40" color="#73E5AC"/>
						<ul className="list-group">
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Всего вопросов - {question_summary}
							</li>
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Верно отвечено - {correct_answers}
							</li>
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Неверно отвечено - {wrong_questions}
							</li>
						</ul>
					</div>
				</div>
			</Row>
			<Row className="fs-5 mb-lg-5 mb-3">
				<div>
					<h3 className="text-primary">Время - {timeProgress}%</h3>
					<div className="d-flex align-items-center">
						<ProgressBar progressFill="100" color="#FF8095"/>
						<ul className="list-group">
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Всего времени - {time_summary}
							</li>
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Прошедшее время - {time_spent}
							</li>
							<li
								className="list-group-item border-0 bg-transparent text-primary">
								Оставшееся время - {timeLeft}
							</li>
						</ul>
					</div>
				</div>
			</Row>
			<Row className="fs-4">
				<p>
					Достигнут
					<span className="text-primary"> "{level}"</span>
				</p>
			</Row>
		</div>
	);
}

function ProgressBar({ progressFill, color }) {
	return (
		<div className="progress p-0"
		     style={{
			     transform: 'rotate(180deg)',
			     width: '16px',
			     height: '115px'
		     }}>
			<div className="progress-bar"
			     role="progressbar"
			     style={{
				     height: progressFill + '%',
				     width: '100%',
				     backgroundColor: color
			     }}>
			</div>
		</div>
	);
}