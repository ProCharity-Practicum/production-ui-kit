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
	children: ReactNode;
	text: string;
};

export function ModalConfirm({
	onConfirm,
	onClose,
	className,
	title,
	children,
	text,
}: ModalConfirmProps) {
	return (
		<Modal onClose={onClose}>
			<div className={clsx(styles.modalContent, className)}>
				<div className={clsx(styles.title, className)}>{title}</div>
				{children}
				<Button type={ButtonType.Submit} onClick={onConfirm}>
					<p>{text}</p>
				</Button>
			</div>
		</Modal>
	);
}
