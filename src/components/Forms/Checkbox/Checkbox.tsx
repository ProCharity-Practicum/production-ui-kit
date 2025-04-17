import styles from './Checkbox.module.scss';
import { ReactNode } from 'react';

export type CheckboxProps = {
	variant?:
		| 'Ministry'
		| 'SiteRules'
		| 'Review'
		| 'Materials'
		| 'Admin'
		| 'Unsubscribe'
		| 'NoNewTasks';
	checked?: boolean;
	onChange: (checked: boolean) => void;
	children?: ReactNode;
	className?: string;
};

export function Checkbox({
	onChange,
	variant,
	checked = false,
	children,
	className,
}: CheckboxProps) {
	function renderText(): ReactNode {
		switch (variant) {
			case 'Ministry':
				return (
					<span className={styles.text_medium}>
						Подтверждаю, что на сайте Минюста опубликована отчетность за прошлый
						год
					</span>
				);
			case 'SiteRules':
				return (
					<>
						Соглашаюсь с <a className={styles.link}>правилами сайта</a>
					</>
				);
			case 'Review':
				return (
					<span className={styles.text_medium}>Не публикуйте мой отзыв</span>
				);
			case 'Materials':
				return <>Все необходимые материалы предоставим волонтеру лично</>;
			case 'Admin':
				return (
					<>Права администратора</>
					// <Hint
					// 	position={ hintPosition.centerBottom }
					// >
					// 	Сотрудник с правами администратора может:
					// 	<ul className={ style.checkbox_hint__text }>
					// 		<li>добавлять коллег в личный кабинет НКО и удалять их оттуда,</li>
					// 		<li>редактировать список избранных волонтеров,</li>
					// 		<li>работать с задачами всех сотрудников НКО,</li>
					// 		<li>редактировать профиль организации.</li>
					// 	</ul>
					// </Hint>
				);
			case 'Unsubscribe':
				return <>Отписаться</>;
			case 'NoNewTasks':
				return <>Не получать уведомления о новых задачах</>;
			default:
				return null;
		}
	}

	function handleChange() {
		onChange(!checked);
	}

	return (
		<div className={className}>
			<label className={styles.checkbox}>
				<input
					type="checkbox"
					className={styles['checkbox__native-input']}
					autoComplete="off"
					onChange={handleChange}
					checked={checked}
					data-testid="checkbox"
				/>
				<span
					className={styles['checkbox__pseudo-input']}
					data-testid="checkbox-text"
				>
					{renderText()}
					{children}
				</span>
			</label>
		</div>
	);
}
