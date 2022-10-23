import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Row } from 'reactstrap';

import SvgIcons from '../../second-components/svg-icons/SvgIcons';
import TestingApi from '../../../services/testingApi';

import styles from './testInfo.module.css';
import {
	convertTimeToSeconds, convertToCorrectTime
} from './testInfo.services';

const { vertical_line, list_group_column } = styles;

export default function TestInfo() {
	const [info, setInfo] = useState({});

	useEffect(() => {
		const api = new TestingApi();
		const fetchInfo = async () => {
			const testInfo = await api.getTestResult(1);
			const user = await api.getUser(testInfo.user_id);
			const { first_name, last_name } = user.user;
			return {
				...testInfo,
				user: {
					first_name,
					last_name
				}
			};
		};
		fetchInfo().then(info => setInfo(info));
	}, []);

	const {
		question_summary: totalQuestions,
		skipped_question_summary: skippedQuestions,
		time_spent: timeSpent,
		time_summary: totalTime,
		wrong_questions: wrongAnswers,
		user,
	} = info;

	const totalTimeInSeconds = convertTimeToSeconds(totalTime);
	const timeSpentInSeconds = convertTimeToSeconds(timeSpent);

	const unknown = 'неизвестно';
	return (
		<>
			<Row className="ps-1 mb-4">
				<h4 className="h4 py-4">{user?.first_name} {user?.last_name}</h4>
				<h5 className="h5">
					<SvgIcons id="arrow-right" color="primary" size="20"/>
					<span className="ms-1">Результаты последнего тестирования</span>
				</h5>
				<ListGroup className={`${list_group_column} ps-4 my-2`}>
					<div className={`${vertical_line} text-primary`}>
						<ListGroupItem className="bg-transparent border-0 text-primary pt-0">
							Всего вопрсов - {totalQuestions || unknown}
						</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">
							Верно отвчено - {(totalQuestions - wrongAnswers) || unknown}
						</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">
							Неверно отвечено - {wrongAnswers || unknown}
						</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary pb-0">
							Пропущено - {skippedQuestions || unknown}
						</ListGroupItem>
					</div>
					<div>
						<ListGroupItem className="bg-transparent border-0 text-primary pt-0">
							Всего времени - {convertToCorrectTime(totalTimeInSeconds)}
						</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">
							Прошедшее время - {convertToCorrectTime(timeSpentInSeconds)}
						</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">
							Оставшееся время - {convertToCorrectTime(
							totalTimeInSeconds - timeSpentInSeconds)}
						</ListGroupItem>
					</div>
				</ListGroup>
			</Row>
		</>
	);
}