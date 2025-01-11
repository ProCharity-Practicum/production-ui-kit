// Вспомогательная функция для проверки пагинации для волонтеров
export function parseInteger(value: string | null): number | undefined {
	if (!value) return undefined;
	const parsed = parseInt(value, 10);
	return isNaN(parsed) ? undefined : parsed;
}

// Вспомогательная функция для проверки фильтра "Чем помочь?"
export function validateHelpType(value: string | null): string[] | undefined {
	return value ? value.split(',') : undefined;
}

// Вспомогательная функция для проверки фильтра "Кому помочь?" для Foundations
export function validateHelpFor(value: string | null): string[] | undefined {
	return value ? value.split(',') : undefined;
}

// utils/formDataUtils.ts
export function processFormData<T>(formData: FormData): T {
	const formValues: Record<string, string | string[]> = {};

	formData.forEach((value, key) => {
		// Обработка массивов
		if (Array.isArray(value)) {
			formValues[key] = value.map((val) => String(val));
		}
		// Обработка объектов (например, если есть вложенные объекты или массивы)
		else if (typeof value === 'object') {
			formValues[key] = JSON.stringify(value);
		}
		// Преобразуем другие значения в строки
		else {
			formValues[key] = String(value);
		}
	});

	// Преобразуем в тип T
	return formValues as unknown as T;
}
