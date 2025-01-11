import { Section } from '../Section';
import Project from '../../../../assets/images/project.png';
import { Button } from '../../Button/Button';

export function SectionApplyCTA() {
	return (
		<Section
			title="Приcоединяйся к ProCharity!"
			renderAction={() => <Button>Присоединиться</Button>}
			image={<img src={Project} alt="Procharity"></img>}
		>
			<p>
				Какой-то мотивирующий зарегистрироваться текст для всех категорий
				пользователей
			</p>
		</Section>
	);
}
