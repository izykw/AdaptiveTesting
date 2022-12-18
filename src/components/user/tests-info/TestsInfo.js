import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import WrapperFluid from "../../second-components/wrapper-fluid/WrapperFluid";
import { Container, Row } from "reactstrap";
import { Link} from "react-router-dom";
import SvgIcons from "../../second-components/svg-icons/SvgIcons";
import TestingApi from "../../../services/testingApi";
import { getToken } from "../../../services/getToken";
import styles from './TestsInfo.module.css';

const { list_block } = styles;

export default function TestsInfo({ header: { title, isFluid } }) {
	const [testsInfo, setTestsInfo] = useState([]);
	const [levels, setLevels] = useState([]);
	let knowledgePercentageOverall = 0;

	useEffect(() => {
		const fetchData = async () => {
			const api = new TestingApi();
			const token = getToken();
			const testsInfo = await api.getTestsResult(token);
			const { results: levels } = await api.getLevels();
			return {
				testsInfo,
				levels
			}
		}
		fetchData().then(({ testsInfo, levels }) => {
			setTestsInfo(testsInfo);
			setLevels(levels);
		})
	}, [])

	const CompetenceResult = (temp) => {
		const { competence, level, test_id, user_id } = temp;
		const [currentLevel] = levels.filter((item) => item.name === level);

		const lastLevel = levels[levels.length - 1];
		const knowledgePercentage = (currentLevel.id / lastLevel.id * 100).toFixed(
			1);
		knowledgePercentageOverall += (Number(knowledgePercentage));

		return (
			<div key={`${test_id}-${user_id}`}
			     className="d-flex justify-content-between bg-secondary bg-opacity-25 border border-secondary border-opacity-50 mb-3 ps-4">
				<div className="pt-2">
					<SvgIcons id="arrow-right" size="24" color="secondary"/>
					<span className="ms-2">
							{`${competence} (${knowledgePercentage}%)`}
				</div>
				<div className="d-flex">
					{
						levels.filter(({ id }) => id > 0).map(({ id }) => {
							return CompetenceLevelItem(id, currentLevel.id >= id);
						})
					}
				</div>
			</div>)
	}

	const CompetenceLevelItem = (id, isPainted) => {
		return (
			<div key={id} style={{ width: '50px', height: '40px' }}
			     className={`${isPainted ?
				     'bg-success' :
				     'bg-transparent'}  border border-secondary rounded-3 border-opacity-50 ms-2`}>
			</div>
		)
	}

	return (
		<WrapperFluid>
			<Header isFluid={isFluid} title={title}/>
			<div className="mb-4">
				<Link to="/user"
				   className="text-primary fs-5 ms-1 bg-transparent border-0 text-decoration-underline ">
					<SvgIcons id="arrow-left" color="primary" size="20"/>
					Вернуться в кабинет
				</Link>
			</div>
			<Container fluid
			           className="flex-grow-1 bg-light rounded-3 shadow_element ">
				<Row>
					<div className={`${list_block} border border-secondary p-0`}>
						{
							Array.isArray(testsInfo) &&
							testsInfo.map((item, i, arr) => CompetenceResult(item, i))
						}
					</div>
					<div className="border border-secondary rounded-3 p-0 shadow_element">
						<div className="bg-primary text-light w-100 p-3 rounded-top">
							Профессиональные компетенции
							- {knowledgePercentageOverall / testsInfo.length}%
						</div>
						<div className="progress p-0 rounded-0 rounded-bottom"
						     style={{ height: '2rem' }}>
							<div className="progress-bar bg-success p-0"
							     style={{
								     width: `${knowledgePercentageOverall / testsInfo.length}%`
							     }}
							     role="progressbar">
							</div>
						</div>
					</div>
				</Row>
				<Row>
					<div className="d-flex justify-content-around text-primary p-4">
						<Link   to="/user"
						        className="btn btn-light shadow_element text-primary bg-transparent fs-5 w-25">
							Личный кабинет
						</Link>
						<Link to="/"
						      color="light"
						      className="btn btn-light shadow_element text-primary bg-transparent fs-5 w-25">
							Выход из системы
						</Link>
					</div>
				</Row>
			</Container>
		</WrapperFluid>
	)
}