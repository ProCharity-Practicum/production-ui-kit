import clsx from 'clsx';
import styles from './Modal.module.scss';
import { Icon } from '@/components/Core/Icon';
import { useEffect } from 'react';

export type ModalProps = {
	className?: string;
	onClose: () => void;
	children: React.ReactNode;
	closeOnOverlayClick?: boolean;
};

export function Modal({
	onClose,
	children,
	className,
	closeOnOverlayClick,
}: ModalProps) {
	useEffect(() => {
		if (!closeOnOverlayClick) return; // Если закрытие по клику отключено, Escape тоже игнорируем

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose, closeOnOverlayClick]);

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (closeOnOverlayClick) {
			onClose();
		}
		e.stopPropagation();
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // блокируем всплытие клика из модалки
	};

	return (
		<div
			className={clsx(styles.overlay, className)}
			onClick={handleOverlayClick}
		>
			<div className={styles.modal} onClick={handleModalClick}>
				<button className={clsx(styles.icon, className)} onClick={onClose}>
					<Icon name="close" />
				</button>
				{children}
			</div>
		</div>
	);
}
