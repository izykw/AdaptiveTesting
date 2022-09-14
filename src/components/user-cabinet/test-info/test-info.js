import React, {useState, useEffect} from 'react';
import {ListGroup, ListGroupItem, Row} from 'reactstrap';
import styles from './test-info.module.css';
import SvgIcons from '../../second-components/svg-icons/svg-icons';

const {vertical_line, list_group_column} = styles;

export default function TestInfo() {
	const [info, setInfo] = useState({});

	useEffect(() => {

	}, []);

	return (
		<>
			<Row className="ps-1 mb-4">
				<h4 className="h4 py-4">ИМЯ ПОЛЬЗОВАТЕЛЯ</h4>
				<h5 className="h5">
					<SvgIcons id="arrow-right" color="primary" size="20"/>
					<span className="ms-1">Результаты последнего тестирования</span>
				</h5>
				<ListGroup className={`${list_group_column} ps-4 my-2 `}>
					<div className={`${vertical_line} text-primary`}>
						<ListGroupItem className="bg-transparent border-0 text-primary pt-0">Всего
							вопрсов - 100</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Верно
							отвчено - 100</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Неверно
							отвечено - 100</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary pb-0">Пропущено
							- 100</ListGroupItem>
					</div>
					<div>
						<ListGroupItem className="bg-transparent border-0 text-primary pt-0">Всего
							времени - 100 минут</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Прошедшее
							время - 100 минут</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Оставшееся
							время - 100 минут</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary pb-0">Дополнительное
							время - 100 минут</ListGroupItem>
					</div>
				</ListGroup>
			</Row>
			<Row className="ps-1 mb-4">
				<h5 className="h5">
					<SvgIcons id="arrow-right" color="primary" size="20"/>
					<span className="ms-1">Общая статистика</span>
				</h5>
				<ListGroup className={`${list_group_column} ps-4`}>
					<div className={`${vertical_line}`}>
						<ListGroupItem className="bg-transparent border-0 text-primary">Всего
							вопрсов - 100</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Верно
							отвчено - 100</ListGroupItem>
					</div>
					<div>
						<ListGroupItem className="bg-transparent border-0 text-primary">Неверно
							отвечено - 100</ListGroupItem>
						<ListGroupItem className="bg-transparent border-0 text-primary">Пропущено
							- 100</ListGroupItem>
					</div>
				</ListGroup>
			</Row>
		</>
	);
}