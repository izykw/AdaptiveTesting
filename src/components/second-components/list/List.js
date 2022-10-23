import React from 'react';
import { ListGroup } from 'reactstrap';
import { ListItems } from './ListItem';

import styles from './list.module.css';

const { list_block } = styles;

export default function List({ id, titles, content, handlers }) {
	return (
		<>
			<span className="fs-5">{titles?.list}</span>
			<div
				className={`${list_block} d-flex justify-content-between flex-column border border-secondary rounded-3`}>
				<div className="overflow-auto">
					<ListGroup id={id} onClick={handlers?.list}>
						{
							<ListItems list={content} listId={id}/>
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
		</>
	);
}