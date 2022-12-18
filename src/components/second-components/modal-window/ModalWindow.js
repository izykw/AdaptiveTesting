import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LightButton from '../../moderator/moderator-management-them/LightButton';

export default function ModalWindow({title, message, isOpen, close, doSomething}) {
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>{title}</ModalHeader>
			{
				message && <ModalBody style={{maxHeight: '350px'}} className="overflow-auto text-break">
					<p>{message}</p>}
				</ModalBody>
			}
			<ModalFooter>
				<LightButton width="25" type="text" text="Ок" handler={doSomething}/>
				<LightButton width="25" type="text" text="Отмена" handler={close}/>
			</ModalFooter>
		</Modal>
	);
}