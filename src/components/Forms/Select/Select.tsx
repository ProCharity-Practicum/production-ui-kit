import { useState, useRef } from 'react';
import styles from './Select.module.scss';
import ArrowRoundedUp from './icon_arrow_rounded_up_light.svg';
import ArrowRoundedDown from './icon_arrow_rounded_down_light.svg';

type Option = string | object;

export type SelectProps = {
  label: string;
  options: Option[];
  optionLabel: string;
  value?: Option; // Теперь принимает объект/строку
  onChange?: (selectedOption: Option, name?: string) => void; // Возвращает весь объект
  name?: string;
};

export function Select({
  label,
  options,
  optionLabel,
  value = '',
  name,
  onChange,
}: SelectProps) { 
	const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

	const getDisplayText = (option: Option): string => {
		if (typeof option === 'string') return option;
		const record = option as Record<string, unknown>;
		const labelValue = record[optionLabel];
		
		return typeof labelValue === 'string' || typeof labelValue === 'number' 
			? String(labelValue) 
			: '';
	};

  const handleOptionClick = (option: Option) => {
    setIsOpen(false);
    onChange?.(option, name);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!selectRef.current?.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

	return (
		<div
			className={styles.select}
			data-testid="Select"
			ref={selectRef}
			onBlur={handleBlur}
			tabIndex={0}
		>
			<div
				className={`${styles.panel} ${isOpen && styles.panel_open}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className={styles.panel__text}>
				<label
            className={`${styles.label} ${value !== null && styles.label_active}`}
          >
            {label}
          </label>
					{value !== null && (
            <p className={styles.value}>{getDisplayText(value)}</p>
          )}
				</div>
				<img
					className={styles.arrow}
					src={isOpen ? ArrowRoundedUp : ArrowRoundedDown}
					alt={isOpen ? 'Стрелка вверх' : 'Стрелка вниз'}
				/>
			</div>
			{isOpen && (
        <div className={styles.options}>
          {options.map((option, index) => {
            const displayText = getDisplayText(option);
            return (
              <div
                key={`${typeof option === 'string' ? option : JSON.stringify(option)}-${index}`}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                <p className={styles.optionText}>{displayText}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
