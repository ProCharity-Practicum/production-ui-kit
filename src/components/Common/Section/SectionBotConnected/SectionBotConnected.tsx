import { GoToLink } from '@/components/Common/Button';

import { Section } from '../Section';
import Bot from '@/assets/images/bot.png';

export function SectionBotConnected() {
	return (
		<Section
			title="Поздравляем!"
			renderAction={() => <GoToLink>На главную</GoToLink>}
			image={<img src={Bot} alt="TelegramBot"></img>}
		>
			<p>
				Этот профиль ProCharity привязан к боту в Telegram. Теперь туда будут
				приходить уведомления, касающиеся изменений в профиле и текущих задачах
			</p>
			<p>Управлять уведомлениями можно в Настройках</p>
		</Section>
	);
}
