import React from 'react';
import { Row } from 'reactstrap';

export function TestResult({title, stats}) {
	return (
		<div className="p-5">
			<Row className="fs-5 mb-lg-5 mb-3">
				<div>
					<h3 className="text-primary">Прогресс - 88%</h3>
					<div className="d-flex align-items-center">
						<ProgressBar progressFill="40" color="#73E5AC"/>
						<ul className="list-group">
							<li className="list-group-item border-0 bg-transparent text-primary">
								Всего вопросов - 75 мин
							</li>
							<li className="list-group-item border-0 bg-transparent text-primary">
								Верно отвечено - 66 мин
							</li>
							<li className="list-group-item border-0 bg-transparent text-primary">
								Неверно отвечено - 9 мин
							</li>
						</ul>
					</div>
				</div>
			</Row>
			<Row className="fs-5 mb-lg-5 mb-3">
				<div>
					<h3 className="text-primary">Время - 88%</h3>
					<div className="d-flex align-items-center">
						<ProgressBar progressFill="100" color="#FF8095"/>
						<ul className="list-group">
							<li className="list-group-item border-0 bg-transparent text-primary">
								Всего времени - 75 мин
							</li>
							<li className="list-group-item border-0 bg-transparent text-primary">
								Прошедшее время - 66 мин
							</li>
							<li className="list-group-item border-0 bg-transparent text-primary">
								Оставшееся время - 9 мин
							</li>
						</ul>
					</div>
				</div>
			</Row>
			<Row className="fs-4">
				<p>
					Достигнут
					<span className="text-primary"> "Уровень мастерства"</span>
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