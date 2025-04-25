import clsx from 'clsx';
import styles from './ModalConfirm.module.scss';
import { Modal } from '../Modal';
import { Button } from '@/components/Common/Button/Button';
import { ButtonType } from '@/components/Common/Button';
import { ReactNode } from 'react';

export type ModalConfirmProps = {
	className?: string;
	onConfirm: () => void;
	onClose: () => void;
	title: string;
	children?: ReactNode;
	text: string;
	disabled?: boolean;
	isLoading?: boolean;
	closeOnOverlayClick?: boolean;
};

export function ModalConfirm({
	onConfirm,
	onClose,
	className,
	title,
	children,
	text,
	disabled = false,
	isLoading = false,
	closeOnOverlayClick = true, // в options не вынесено, так как пока один параметр
}: ModalConfirmProps) {
	return (
		<Modal onClose={onClose} closeOnOverlayClick={closeOnOverlayClick}>
			<div className={clsx(styles.modalContent, className)}>
				<div className={clsx(styles.title, className)}>{title}</div>
				{children}
				<Button
					type={ButtonType.submit}
					onClick={onConfirm}
					disabled={disabled}
					waiting={isLoading}
				>
					<p>{text}</p>
				</Button>
			</div>
		</Modal>
	);
}
