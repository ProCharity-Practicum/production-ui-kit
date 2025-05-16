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
	options?: {
		closeOnOverlayClick?: boolean;
		submitButtonName?: string;
	};
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
	options,
}: ModalConfirmProps) {
	const { closeOnOverlayClick, submitButtonName } = options ?? {};
	const isCloseOverlayClick = closeOnOverlayClick ?? true;

	return (
		<Modal
			onClose={onClose}
			options={{ closeOnOverlayClick: isCloseOverlayClick }}
		>
			<div
				className={clsx(styles.modalContent, className)}
				data-testid="ModalConfirm"
			>
				<div className={clsx(styles.title, className)}>{title}</div>
				{children}
				<Button
					name={submitButtonName}
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
