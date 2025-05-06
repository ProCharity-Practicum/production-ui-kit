import clsx from 'clsx';
import styles from './Modal.module.scss';
import { Icon } from '@/components/Core/Icon';
import { useEffect } from 'react';

export type ModalProps = {
	className?: string;
	onClose: () => void;
	children: React.ReactNode;
	options?: {
		closeOnOverlayClick?: boolean;
	};
};

export function Modal({ onClose, children, className, options }: ModalProps) {
	const { closeOnOverlayClick } = options ?? {};
	useEffect(() => {
		if (closeOnOverlayClick) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOverlayClick = (e: React.MouseEvent) => {
		const isClickOutside = e.target === e.currentTarget
		if (!closeOnOverlayClick && isClickOutside) {
			onClose();
		}
	};

	return (
		<div
			className={clsx(styles.overlay, className)}
			onClickCapture={handleOverlayClick}
			data-testid="Modal"
		>
			<div className={styles.modal}>
				<button
					type="button"
					aria-label="close"
					className={clsx(styles.icon, className)}
					onClick={onClose}
				>
					<Icon name="close" />
				</button>
				{children}
			</div>
		</div>
	);
}
