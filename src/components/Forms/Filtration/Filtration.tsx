import { useState, useEffect } from 'react';
import styles from './Filtration.module.scss';
import { HelpSelector } from '../Select/HelpSelector/HelpSelector';
import { Chips } from '../Chips/Chips';
import { InputSearchQuery } from '../Input/InputSearchQuery/InputSearchQuery';
import { Toggle } from '../Toggle/Toggle';

type MultipleOption = {
	title: string;
	values: string[];
};

type TFiltration = {
	categories: string[];
	funds: string[];
	search: string[];
	isOnline: boolean;
};

type FiltrationProps = {
	setSelectedFilters: (filters: TFiltration) => void;
	howOptions: MultipleOption[];
	whoOptions: MultipleOption[];
	role?: 'company' | 'volunteer' | 'nko';
	defaultFilters?: TFiltration;
};

export const Filtration = ({
	setSelectedFilters,
	howOptions,
	whoOptions,
	role = 'company',
	defaultFilters = {
		categories: [],
		funds: [],
		search: [],
		isOnline: false,
	},
}: FiltrationProps) => {
	const [filters, setFilters] = useState<TFiltration>(defaultFilters);
	const [searchInput, setSearchInput] = useState('');

	const helpOptions = [
		{
			title: 'Навыки',
			values: howOptions.flatMap((cat) => cat.values),
		},
	];

	const fundsOptions = [
		{
			title: 'Фонды',
			values: whoOptions.flatMap((fund) => fund.values),
		},
	];

	const allChips = [...filters.categories, ...filters.funds, ...filters.search];

	const handleRemoveChip = (chip: string) => {
		setFilters((prev) => {
			// Определяем, к какому типу фильтров относится чипс
			const isCategory = prev.categories.includes(chip);
			const isFund = prev.funds.includes(chip);

			return {
				...prev,
				categories: isCategory
					? prev.categories.filter((v) => v !== chip)
					: prev.categories,
				funds: isFund ? prev.funds.filter((v) => v !== chip) : prev.funds,
				search: prev.search.filter((v) => v !== chip),
			};
		});
	};

	const handleToggleChange = (isOnline: boolean) => {
		setFilters((prev) => ({ ...prev, isOnline }));
	};

	// Обработка нажатия Enter в поиске
	const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && searchInput.trim()) {
			setFilters((prev) => ({
				...prev,
				search: [...prev.search, searchInput.trim()],
			}));
			setSearchInput('');
			e.currentTarget.blur();
		}
	};

	useEffect(() => {
		setSelectedFilters(filters);
	}, [filters, setSelectedFilters]);

	return (
		<div className={styles.filtration}>
			<div className={styles.controls} data-role={role}>
				{(!role || role === 'company' || role === 'volunteer') && (
					<div className={styles.selector}>
						<HelpSelector
							label="ЧЕМ ПОМОЧЬ"
							options={helpOptions}
							setInitialValues={(values) =>
								setFilters((prev) => ({
									...prev,
									categories: values,
								}))
							}
							initialValues={filters.categories}
						/>
					</div>
				)}

				{(!role || role === 'company' || role === 'nko') && (
					<div className={styles.selector}>
						<HelpSelector
							label="КОМУ ПОМОЧЬ"
							options={fundsOptions}
							setInitialValues={(values) =>
								setFilters((prev) => ({
									...prev,
									funds: values,
								}))
							}
							initialValues={filters.funds}
						/>
					</div>
				)}

				<div className={styles.search}>
					<InputSearchQuery
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={handleSearchKeyDown}
						placeholder="Поиск по ключевым словам"
					/>
				</div>

				{(!role || role === 'company') && (
					<div className={styles.toggle}>
						<Toggle
							checked={filters.isOnline}
							onChange={handleToggleChange}
							text="ТОЛЬКО ОНЛАЙН-ЗАДАЧИ"
						/>
					</div>
				)}
			</div>

			{allChips.length > 0 && (
				<div className={styles.chips}>
					<Chips filters={allChips} onDelete={handleRemoveChip} />
				</div>
			)}
		</div>
	);
};
