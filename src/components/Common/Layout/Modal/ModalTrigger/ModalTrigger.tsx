import React, { useState, ReactNode, ReactElement } from 'react';

export type ModalTriggerProps = {
	trigger: ReactElement;
	renderModal: (onClose: () => void) => ReactNode;
};

export function ModalTrigger({ trigger, renderModal }: ModalTriggerProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			{React.cloneElement(trigger, { onClick: openModal })}
			{isModalOpen && renderModal(closeModal)}
		</>
	);
}
