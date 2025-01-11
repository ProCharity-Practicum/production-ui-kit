import clsx from 'clsx';
import styles from './Modal.module.scss';
import { Icon } from '@/components/Core/Icon';

export type ModalProps = {
	className?: string;
	onClose: () => void;
	children: React.ReactNode;
};

export function Modal({ onClose, children, className }: ModalProps) {
	return (
		<div
			className={clsx(styles.overlay, className)}
			onClick={(e) => e.stopPropagation()}
		>
			<div className={styles.modal}>
				<button className={clsx(styles.icon, className)} onClick={onClose}>
					<Icon name="close" />
				</button>
				{children}
			</div>
		</div>
	);
}
