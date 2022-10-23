import React from 'react';
import { ListGroup } from 'reactstrap';
import { ListItems } from './ListItem';

import styles from './list.module.css';

const { list_block } = styles;

// 0 item for list, 1 item for button
export default function List({ id, titles, content, handlers }) {
	return (
		<>
			<span className="fs-5">{titles[0]}</span>
			<div className={`${list_block} d-flex justify-content-between flex-column border border-secondary rounded-3`}>
				<div className="overflow-auto">
					<ListGroup id={id} onClick={handlers[0]}>
						{
							<ListItems list={content} listId={id}/>
						}
					</ListGroup>
				</div>
				<a
					href="/"
					onClick={handlers[1]}
					className="link-secondary text-center border-top border-secondary p-2">
					{titles[1]}
				</a>
			</div>
		</>
	);
}