import React from 'react'
import { SortItemType } from "../assets/utils/componentDataType";

type SortProps = {
	items: SortItemType[];
	activeSort: SortItemType;
	onClickSort: (obj: SortItemType) => void
}
type PopupClick = MouseEvent & {
	path: Node[];
};

export const Sort: React.FC<SortProps> = React.memo(props => {
	const { items, activeSort, onClickSort } = props
	const [open, setOpen] = React.useState(false)
	const sortRef = React.useRef<HTMLDivElement>(null)
	const onClickListSort = (obj: SortItemType) => {
		onClickSort(obj)
		setOpen(false)
	}

	React.useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			const _event = event as PopupClick
			if (sortRef.current && !_event.path.includes(sortRef.current)) {
				setOpen(false)
			}
		}
		document.body.addEventListener('click', handleOutsideClick)
		return () => {
			//при размонтиров. комп. удаляем событие
			document.body.removeEventListener('click', handleOutsideClick)
		}
	}, [])

	return (
		<div
			ref={sortRef} //ссылка на элемент (ref)=>{sortRef.current=ref} будет ref={sortRef}
			className='sort'
		>
			<div className='sort__label'>
				<svg
					className={open ? 'rotated' : ''}
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{activeSort.name}</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{items &&
							items.map((obj, index) => (
								<li
									key={`${obj.type}_${index}`}
									className={activeSort.type === obj.type ? 'active' : ''}
									onClick={() => onClickListSort(obj)}
								>
									{obj.name}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	)
})
