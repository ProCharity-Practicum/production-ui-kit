import React, { useRef, useState } from 'react';
import ReactCrop, {
	Crop,
	PixelCrop,
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from 'react-image-crop';
import './ReactCrop.scss';
import style from './style.module.scss';
import { Modal } from '../../Layout/Modal/Modal';
//import { ModalTrigger } from '../../Layout/Modal/ModalTrigger/ModalTrigger';
import { Button } from '../../Button';
import { ButtonVariant } from '../../Button';
import { Avatar } from '../Avatar/Avatar';

// Cropper size params
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 50;

interface ISelectAvatar {
	avatar: string; // src отображаемого аватара

	/* Функция onDeleteAvatar должна удалять avatar
  из данных пользователя на сервере,
  отправляет запрос на сервер и т.д. */
	onDeleteAvatar: () => Promise<{ ok: boolean }>;

	/* Функция onChangeAvatar принимает src новой обрезанной картинки и обновляет avatar,
  далее отправляет запрос на сервер и т.д. */
	onChangeAvatar: (newAvatar: string) => void;
}

const SelectAvatar = ({
	avatar,
	onChangeAvatar,
	onDeleteAvatar,
}: ISelectAvatar) => {
	// стейт видимости модалки
	const [open, setOpen] = useState<boolean>(false);
	// Исходный загруженный файл
	const [imgSrc, setImgSrc] = useState<string | null>(null);
	// Данные самого кропа: размеры, расположение
	const [crop, setCrop] = useState<Crop>();
	// Отображение аватара на странице
	const [croppedImage, setCroppedImage] = useState<string | null>(
		avatar || null
	);

	const imgRef = useRef<HTMLImageElement>(null);

	const handleOpenModal = () => {
		setOpen(true);
	};
	const handleCloseModal = () => {
		setOpen(false);
		setImgSrc(null);
		setCrop(undefined);
	};

	// Загрузка файла и подготовка для предпросмотра
	const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (!e.target.files || e.target.files[0].size > 5 * 1024 * 1024) {
				throw new Error('Файл не найден или его размер превышает 5Мб');
			}
			setImgSrc(null);
			setCrop(undefined);
			setCroppedImage(''); // Сброс состояния аватарки
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.addEventListener('load', () => {
				const result = reader.result;
				if (typeof result === 'string') {
					setImgSrc(result);
				}
			});
			reader.readAsDataURL(file);
			handleOpenModal();
		} catch (err) {
			console.log(err);
		}
	};

	// Отображение кроппера
	const onImageLoad = (e: React.ChangeEvent<HTMLImageElement>) => {
		const { width, height } = e.currentTarget;
		const cropWidthInPercent = 80;
		const crop = makeAspectCrop(
			{
				unit: '%',
				width: cropWidthInPercent,
			},
			ASPECT_RATIO,
			width,
			height
		);
		const centeredCrop = centerCrop(crop, width, height);
		setCrop(centeredCrop);
	};

	// Нажатие на неотображаемый на странице input
	const handleImageChange = () => {
		document.getElementById('avatar-input')?.click();
	};

	// Создание обрезанного изображения для аватара
	const setCanvasPreview = (image: HTMLImageElement, crop: PixelCrop) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) {
			throw new Error('no 2d context');
		}

		const pixelRatio = window.devicePixelRatio;
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
		canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

		ctx.scale(pixelRatio, pixelRatio);
		ctx.imageSmoothingQuality = 'high';

		const cropX = crop.x * scaleX;
		const cropY = crop.y * scaleY;

		ctx.save();
		ctx.translate(-cropX, -cropY);
		ctx.drawImage(
			image,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight
		);
		ctx.restore();

		const croppedImg = new Image();
		croppedImg.src = canvas.toDataURL();

		setCroppedImage(croppedImg.src);
		onChangeAvatar(croppedImg.src);
		//	console.log(croppedImg.src);
	};

	const handleSubmit = () => {
		try {
			if (crop && imgRef.current) {
				const cropInfo = convertToPixelCrop(
					crop,
					imgRef.current.width,
					imgRef.current.height
				);
				setCanvasPreview(imgRef.current, cropInfo);
				handleCloseModal();
			}

			const inputElement: HTMLInputElement | null =
				document.querySelector('#avatar-input');
			if (inputElement) inputElement.value = '';
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteAvatar = async () => {
		try {
			const response = await onDeleteAvatar(); // Ожидаем успешного выполнения запроса к серверу
			if (response.ok) {
				setImgSrc(null);
				setCroppedImage(null); // Сброс состояния croppedImage
				setCrop(undefined); // Сброс состояния crop
			} else {
				console.error('Ошибка при удалении аватара: не удалось удалить аватар');
			}
		} catch (error) {
			console.error('Ошибка при удалении аватара:', error);
		}
	};

	return (
		<>
			<div className={style.wrapper}>
				{croppedImage ? (
					<>
						<button
							type="button"
							className={style.avatar__overlay_container}
							onClick={handleImageChange}
						>
							<div className={style.avatar__overlay}></div>
							<div className={style.avatar__overlay_icon}></div>
							<Avatar className={style.image} image={croppedImage} />
						</button>
						<button
							type="button"
							className={style.avatar__delete}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={handleDeleteAvatar} // Используем новую функцию
						/>
					</>
				) : (
					<div className={style.avatar}>
						<span className={style.avatar__text} onClick={handleImageChange}>
							Добавить фото
						</span>
					</div>
				)}

				<p className={style.notice}>Jpg, png объемом не более 5 Мб</p>
				<input
					id="avatar-input"
					type="file"
					accept=".jpg, .png"
					style={{ display: 'none' }}
					onChange={onSelectFile}
				/>
			</div>

			{open && (
				<Modal onClose={handleCloseModal}>
					<div className={style.modal}>
						<h2 className={style.modal__title}>Выбери фрагмент изображения</h2>
						{imgSrc && (
							<div className={style.modal__image__wrapper}>
								<ReactCrop
									crop={crop}
									onChange={(_, percentCrop) => setCrop(percentCrop)}
									circularCrop
									keepSelection
									aspect={ASPECT_RATIO}
									minWidth={MIN_DIMENSION}
								>
									<img
										ref={imgRef}
										src={imgSrc}
										alt="Upload"
										className={style.modal__image}
										onLoad={onImageLoad}
									/>
								</ReactCrop>
							</div>
						)}
						<Button variant={ButtonVariant.primary} onClick={handleSubmit}>
							СОХРАНИТЬ
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SelectAvatar;
