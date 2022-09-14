import React from 'react';
import {Col, ListGroup, ListGroupItem} from 'reactstrap';
import SvgIcons from '../svg-icons/svg-icons';
import styles from './list-custom.module.css';


const {list_block} = styles;

export default function ListCustom(props) {
	const {size: {xxl, md}, titles, content, handlers} = props;
	return (
		<Col xxl={xxl} md={md}>
			<span className="fs-5">{titles?.list}</span>
			<div
				className={`${list_block} d-flex justify-content-between flex-column border border-secondary rounded-3`}>
				<div className="overflow-auto">
					<ListGroup onClick={handlers?.list}>
						{
							createListItems(content)
						}
					</ListGroup>
				</div>
				<a
					href="/"
					onClick={handlers?.btn}
					className="link-secondary text-center border-top border-secondary p-2"
				>
					{titles?.btn}
				</a>
			</div>
		</Col>
	);
}

function createListItems(list) {
	if (!Array.isArray(list)) {
		//throw new Error(`List: ${list} is not array`)
		return;
	}
	return list.map(el => {
		// Theme list include name. Question list include question
		const {pk, name, question, level} = el;
		return (
			<ListGroupItem id={pk} key={pk} className="ps-2">
				<SvgIcons id={`${level}-star`} size="72" color="dark"/>
				<span style={{verticalAlign: 'middle'}}>{name ??
					question}</span>
			</ListGroupItem>);
	});
}