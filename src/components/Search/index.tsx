import React from 'react'
import debounce from 'lodash.debounce'
import { setSearchValue } from '../../redux/filter/slice'
import styles from './Search.module.scss'
import { useAppDispatch } from "../../redux/store";
import {fetchItems} from "../../redux/items/asyncActions";
import {useSelector} from "react-redux";
import {selectFilter} from "../../redux/filter/selectors";
import {selectItemsData} from "../../redux/items/selectors";

export const Search: React.FC = () => {
	const dispatch = useAppDispatch()
	const { category, sort, currentPage } = useSelector(selectFilter) // можно через пропс
	const { notFound } = useSelector(selectItemsData) // можно через пропс
	const [value, setValue] = React.useState<string>('')
	const inputRef = React.useRef<HTMLInputElement>(null)
	const onClickClear = () => {
		setValue('')
		if (!notFound) {
			dispatch(fetchItems({category, sort, currentPage}))
		}
		if (notFound) {
			dispatch(setSearchValue(''))
		}
		// if (inputRef.current) {
		// 	inputRef.current.focus()
		// }
		inputRef.current?.focus()
	}
	const updateSearchValue = React.useCallback(
		debounce(str => {
			dispatch(setSearchValue(str))
		}, 1000),
		[]
	)
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				enableBackground='new 0 0 32 32'
				height='32px'
				version='1.1'
				viewBox='0 0 32 32'
				width='32px'
				xmlSpace='preserve'
			>
				<g id='search_magnifier_magnifying_glass_loupe'>
					<g id='search_funds_x2C__magnifying_glass_x2C__magnifier_x2C__loupe_1_'>
						<g id='analysis_2_'>
							<g>
								<g>
									<g>
										<path
											d='M23.586,23.586c0.122-0.122,0.262-0.217,0.408-0.299l-2.276-2.277c-0.195-0.195-0.512-0.195-0.707,0        c-0.195,0.196-0.195,0.512,0,0.708l2.271,2.271C23.368,23.846,23.464,23.707,23.586,23.586z'
											fill='#263238'
										/>
										<path
											d='M28.5,31c-0.667,0-1.295-0.26-1.768-0.732l-3.5-3.5C22.76,26.295,22.5,25.668,22.5,25        s0.26-1.295,0.732-1.768c0.906-0.906,2.629-0.906,3.535,0l3.5,3.5C30.74,27.205,31,27.832,31,28.5s-0.26,1.295-0.732,1.768        S29.167,31,28.5,31z M25,23.52c-0.407,0-0.793,0.152-1.061,0.42C23.656,24.223,23.5,24.6,23.5,25s0.156,0.777,0.439,1.061        l3.5,3.5c0.567,0.566,1.554,0.566,2.121,0C29.844,29.277,30,28.9,30,28.5s-0.156-0.777-0.439-1.061l-3.5-3.5        C25.793,23.672,25.407,23.52,25,23.52z'
											fill='#263238'
										/>
									</g>
									<g>
										<path
											d='M13,22.45c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5c3.767,0,7.035-2.404,8.133-5.981        c0.081-0.264,0.361-0.415,0.625-0.331c0.264,0.081,0.413,0.36,0.332,0.624C20.861,19.763,17.209,22.45,13,22.45z'
											fill='#263238'
										/>
									</g>
									<path
										d='M13,25C6.383,25,1,19.617,1,13S6.383,1,13,1s12,5.383,12,12S19.617,25,13,25z M13,2       C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z'
										fill='#263238'
									/>
								</g>
							</g>
						</g>
					</g>
					<circle cx='22' cy='13' fill='#263238' r='0.5' />
				</g>
			</svg>
			<input
				className={styles.input}
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				placeholder='Поиск'
			/>
			{value && (
				<svg
					className={styles.clearIcon}
					onClick={onClickClear}
					xmlns='http://www.w3.org/2000/svg'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					enableBackground='new 0 0 26 26'
					id='Слой_1'
					version='1.1'
					viewBox='0 0 26 26'
					xmlSpace='preserve'
				>
					<path
						d='M14.0605469,13L24.7802734,2.2802734c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469  s-0.7675781-0.2929688-1.0605469,0L13,11.9394531L2.2802734,1.2197266c-0.2929688-0.2929688-0.7675781-0.2929688-1.0605469,0  s-0.2929688,0.7675781,0,1.0605469L11.9394531,13L1.2197266,23.7197266c-0.2929688,0.2929688-0.2929688,0.7675781,0,1.0605469  C1.3662109,24.9267578,1.5576172,25,1.75,25s0.3837891-0.0732422,0.5302734-0.2197266L13,14.0605469l10.7197266,10.7197266  C23.8662109,24.9267578,24.0576172,25,24.25,25s0.3837891-0.0732422,0.5302734-0.2197266  c0.2929688-0.2929688,0.2929688-0.7675781,0-1.0605469L14.0605469,13z'
						fill='#1D1D1B'
					/>
				</svg>
			)}
		</div>
	)
}