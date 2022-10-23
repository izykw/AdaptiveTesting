import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import LightButton from '../../moderator/moderator-management-them/LightButton';

export default function ModalWindow({ref, title, message, isOpen, close}) {
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>{title}</ModalHeader>
			<ModalBody style={{maxHeight: '350px'}} className="overflow-auto text-break">
				<p>{message}</p>
			</ModalBody>
			<ModalFooter>
				<LightButton type="text" text="Закрыть" handler={close}/>
			</ModalFooter>
		</Modal>
	);
}