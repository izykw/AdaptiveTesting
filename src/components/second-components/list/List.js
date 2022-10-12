import React from 'react';
import {Col, ListGroup} from 'reactstrap';
import { ListItems } from './ListItem';

import styles from './list.module.css';

const {list_block} = styles;

export default function List(props) {
	const {size: {xxl, md}, titles, content, handlers} = props;
	return (
		<Col xxl={xxl} md={md}>
			<span className="fs-5">{titles?.list}</span>
			<div
				className={`${list_block} d-flex justify-content-between flex-column border border-secondary rounded-3`}>
				<div className="overflow-auto">
					<ListGroup onClick={handlers?.list}>
						{
							<ListItems list={content}/>
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