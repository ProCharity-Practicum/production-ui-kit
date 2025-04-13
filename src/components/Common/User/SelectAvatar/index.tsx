import React, { useRef, useState, useCallback } from 'react';
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
import { Button } from '../../Button';
import { ButtonVariant } from '../../Button';
import { Avatar } from '../Avatar/Avatar';
import { ASPECT_RATIO, MIN_DIMENSION, MAX_FILE_SIZE } from './constants';
import { ISelectAvatar } from './types';

const SelectAvatar = ({
	avatar,
	onChangeAvatar,
	onDeleteAvatar,
	variant = 'volunteer', // Значение по умолчанию
}: ISelectAvatar) => {
	const [open, setOpen] = useState(false);
	const [imgSrc, setImgSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState<Crop>();
	const [croppedImage, setCroppedImage] = useState<string | null>(
		avatar || null
	);
	const imgRef = useRef<HTMLImageElement>(null);

	const handleOpenModal = useCallback(() => setOpen(true), []);
	const handleCloseModal = useCallback(() => {
		setOpen(false);
		setImgSrc(null);
		setCrop(undefined);
	}, []);

	const onSelectFile = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			try {
				const file = e.target.files?.[0];
				if (!file || file.size > MAX_FILE_SIZE) {
					throw new Error('Файл не найден или его размер превышает 5Мб');
				}

				setImgSrc(null);
				setCrop(undefined);
				setCroppedImage('');

				const reader = new FileReader();
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						setImgSrc(reader.result);
					}
				};
				reader.readAsDataURL(file);
				handleOpenModal();
			} catch (err) {
				console.error(err);
			}
		},
		[handleOpenModal]
	);

	const onImageLoad = useCallback((e: React.ChangeEvent<HTMLImageElement>) => {
		const { width, height } = e.currentTarget;
		const cropWidthInPercent = 80;
		const newCrop = makeAspectCrop(
			{
				unit: '%',
				width: cropWidthInPercent,
			},
			ASPECT_RATIO,
			width,
			height
		);
		setCrop(centerCrop(newCrop, width, height));
	}, []);

	const handleImageChange = useCallback(() => {
		document.getElementById('avatar-input')?.click();
	}, []);

	const setCanvasPreview = useCallback(
		(image: HTMLImageElement, crop: PixelCrop) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

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
		},
		[onChangeAvatar]
	);

	const handleSubmit = useCallback(() => {
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

			const inputElement =
				document.querySelector<HTMLInputElement>('#avatar-input');
			if (inputElement) inputElement.value = '';
		} catch (err) {
			console.error(err);
		}
	}, [crop, handleCloseModal, setCanvasPreview]);

	const handleDeleteAvatar = useCallback(async () => {
		try {
			const response = await onDeleteAvatar();
			if (response.ok) {
				setImgSrc(null);
				setCroppedImage(null);
				setCrop(undefined);
			} else {
				console.error('Ошибка при удалении аватара');
			}
		} catch (error) {
			console.error('Ошибка при удалении аватара:', error);
		}
	}, [onDeleteAvatar]);

	return (
		<>
			<div className={`${style.wrapper} ${style[variant]}`}>
				{croppedImage ? (
					<>
						<button
							type="button"
							className={style.avatarOverlayContainer}
							onClick={handleImageChange}
						>
							<div className={style.avatarOverlay} />
							<div className={style.avatarOverlayIcon} />
							<Avatar className={style.image} image={croppedImage} />
						</button>
						<button
							type="button"
							className={style.avatarDelete}
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							onClick={handleDeleteAvatar}
						/>
					</>
				) : (
					<div className={style.avatar} onClick={handleImageChange}>
						<span className={style.avatarText}>Добавить фото</span>
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
						<h2 className={style.modalTitle}>Выбери фрагмент изображения</h2>
						{imgSrc && (
							<div className={style.modalImageWrapper}>
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
										className={style.modalImage}
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
