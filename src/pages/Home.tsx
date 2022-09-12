import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams, useLocation } from 'react-router-dom'
import { Categories, Sort, ItemsBlock, Search, Pagination, ItemsLoader, ErrorInfo } from '../components'
import {categoryNames, sortItems} from '../assets/utils/componentData'
import {fetchItems, fetchSearchItems} from '../redux/items/asyncActions'
import {selectFilter} from "../redux/filter/selectors";
import {SortItemType} from "../assets/utils/componentDataType";
import {selectItemsData} from "../redux/items/selectors";
import {useAppDispatch} from "../redux/store";
import { setCategory, setSort, setCurrentPage, setFiltersParams, resetToHomePage } from '../redux/filter/slice'
import {resetNotFound} from "../redux/items/slice";

const Home = () => {
	const { category, sort, searchValue, currentPage, isToHomePage } = useSelector(selectFilter)
	const { items, statusItems, notFound } = useSelector(selectItemsData)
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const location = useLocation()
	const isParams = React.useRef(false)
	const isMounted = React.useRef(false)
	const onSelectCategory = React.useCallback((id: number) => {
        dispatch(setCategory(id))
		dispatch(resetNotFound(false))
    }, [])
	const onSelectSort = React.useCallback((type: SortItemType) => {
		dispatch(setSort(type))
	}, [])
	const onChangePage = React.useCallback((page: number) => {
		dispatch(setCurrentPage(page))
	}, [])
	const getItems = async () => {
		dispatch(
			fetchItems({
				category,
				sort,
				currentPage,
			})
		)
	}
	const getSearchItems = async () => {
		dispatch(fetchSearchItems(searchValue))
	}
	React.useEffect(() => {
		if (location.search) {
			const params = {
				category: Number(searchParams.get('category')),
				sort: sortItems.find(obj => obj.type === searchParams.get('sort')),
				currentPage: Number(searchParams.get('currentPage')),
			}
			dispatch(setFiltersParams({category: params.category, currentPage: params.currentPage, sort: params.sort || sortItems[0]}))
			isParams.current = true
		}
	}, [])

	React.useEffect(() => {
		window.scrollTo(0, 0)
		if (!isParams.current) {
			getItems()
		}
		isParams.current = false
	}, [currentPage, category, sort])

	React.useEffect(() => {
		if (isMounted.current && !notFound) {
			getSearchItems()
		}
		if (isMounted.current && notFound) {
			getItems()
			dispatch(resetNotFound(false))
		}
	}, [searchValue])

	React.useEffect(() => {
		if (isMounted.current && !isToHomePage) {
			setSearchParams({
				category: String(category),
				sort: String(sort.type),
				currentPage: String(currentPage),
			})
		}
		if (isToHomePage) {
			dispatch(resetToHomePage(false))
		}
		isMounted.current = true
	}, [currentPage, category, sort])

	const coffee = items.map(obj => <ItemsBlock key={obj.id} {...obj} />)
	const skeletons = [...new Array(6)].map((_, index) => (
		<ItemsLoader key={index} />
	))

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					items={categoryNames}
					activeCategory={category}
					onClickCategory={onSelectCategory}
				/>
				<Sort items={sortItems} activeSort={sort} onClickSort={onSelectSort} />
			</div>
			<div className='content__title'>
				<h2>{categoryNames[category]}</h2>
				<Search />
			</div>
			{statusItems === 'error' ? (
				<ErrorInfo />
			) : (
				<div className='content__items'>
					{statusItems === 'loading' ? skeletons : notFound ? <>Не найдено</> : coffee}
				</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
