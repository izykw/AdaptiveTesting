import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import ButtonCustom from '../button-custom/button-custom';

export default function ModalWindow({title, message, isOpen}) {
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>{title}</ModalHeader>
			<ModalBody style={{maxHeight: '350px'}} className="overflow-auto text-break">
				<p>{message}</p>
			</ModalBody>
			<ModalFooter>
				<ButtonCustom  type="text" text="Закрыть" handler={null}/>
			</ModalFooter>
		</Modal>
	);
}