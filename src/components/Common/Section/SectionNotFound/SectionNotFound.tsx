import { GoToLink } from '@/components/Common/Button';
import { Section } from '../Section';
import png404 from '@/assets/images/404.png';

export function SectionNotFound() {
	return (
		<Section
			title="Такой страницы не нашлось"
			renderAction={() => <GoToLink>На главную</GoToLink>}
			image={<img src={png404} alt="Error 404"></img>}
		>
			<p>
				Возможно, ссылка на страницу устарела или страницу уже удалили. Можно
				вернуться к поиску или перейти на главную
			</p>
		</Section>
	);
}
