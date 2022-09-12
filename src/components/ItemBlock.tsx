import React from 'react'
import { useNavigate } from "react-router-dom";
import classNames from 'classnames'
import { Button } from './'
import { availableTypes, availableWeight } from '../assets/utils/componentData'
import { ItemCartType } from "../assets/utils/componentDataType";

type ItemBlockProps = {
    id: string;
    title: string;
    imageUrlPage: string;
    types: number[];
    ingredients: string;
    description: string;
    details: {[key: string]: {price: number; weight: number}};
    onClickAddItem: (item: ItemCartType) => void;
}

export const ItemBlock: React.FC<ItemBlockProps> = props => {
	const {
		id,
		title,
		imageUrlPage,
		types,
		ingredients,
		description,
		details,
		onClickAddItem,
	} = props
	const [activeType, setActiveType] = React.useState<number>(types[0])
	const [activeWeight, setActiveWeight] = React.useState<number>(0)
	const [itemCount, setItemCount] = React.useState<number>(1)
	const navigate = useNavigate();
	const changeCount = (val: string) => {
		if (val === 'inc') {
			setItemCount(itemCount + 1)
		}
		if (val === 'dec') {
			if (itemCount > 1) {
				setItemCount(itemCount - 1)
			}
		}
	}
	const currentPrice = details[availableWeight[activeWeight]].price * itemCount
	const onAddItemToCart = () => {
		const item: ItemCartType = {
			id,
			title,
			imageUrlPage,
			type: availableTypes[activeType],
			weight: details[availableWeight[activeWeight]].weight,
			price: currentPrice,
			count: itemCount,
		}
		setItemCount(1)
		onClickAddItem(item)
	}
	return (
		<div className='item-block'>
			<div className='item-block__image'>
				<img src={imageUrlPage} alt='Coffee' />
			</div>
			<div className='item-block__content'>
				<h1>{title}</h1>
				<p>{ingredients}</p>
				<p>{description}</p>
				<div className='item-block__selector'>
					<ul>
						{availableTypes.map((type, index) => (
							<li
								key={type}
								onClick={() => setActiveType(index)}
								className={classNames({
									active: activeType === index,
									disabled: !types.includes(index),
								})}
							>
								{type}
							</li>
						))}
					</ul>
					<ul>
						{availableWeight.map(
							(currentWeight, index) =>
								details.hasOwnProperty(currentWeight) && (
									<li
										key={currentWeight}
										onClick={() => setActiveWeight(index)}
										className={classNames({
											active: activeWeight === index,
											//disabled: !details.hasOwnProperty(currentWeight),
										})}
									>
										{details[currentWeight].weight} г
									</li>
								)
						)}
					</ul>
				</div>
				<div className='item-block__number'>
					<p>Количество:</p>
					<div className='item-block__number__item'>
						<Button
							disabled={itemCount===1}
							className='button button--outline button--circle item-block__number__item-minus'
							onClick={() => changeCount('dec')}
						>
							<svg
								width='10'
								height='10'
								viewBox='0 0 10 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
									fill='#EB5A1E'
								/>
								<path
									d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
									fill='#EB5A1E'
								/>
							</svg>
						</Button>
						<b>{itemCount}</b>
						<Button
							className='button button--outline button--circle item-block__number__item-plus'
							onClick={() => changeCount('inc')}
						>
							<svg
								width='10'
								height='10'
								viewBox='0 0 10 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
									fill='#EB5A1E'
								/>
								<path
									d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
									fill='#EB5A1E'
								/>
							</svg>
						</Button>
					</div>
				</div>
				<div className='item-block__price'>
					<p>Всего:</p>
					<b>{currentPrice} грн</b>
				</div>
				<div className='item-block__bottom-buttons'>
					<Button
						className='button button--outline go-back-btn'
						onClick={() => navigate(-1)}
					>
						<svg
							width='8'
							height='14'
							viewBox='0 0 8 14'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M7 13L1 6.93015L6.86175 1'
								stroke='#D3D3D3'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						<span>Вернуться назад</span>
					</Button>
					<Button className='button pay-btn' onClick={onAddItemToCart}>
						<span>В корзину</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
