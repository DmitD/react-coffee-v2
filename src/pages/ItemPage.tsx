import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ItemBlock, ItemLoader, ErrorInfo } from '../components'
import { addItem } from '../redux/cart/slice'
import { fetchItem } from '../redux/item/asyncAction'
import {useAppDispatch} from "../redux/store";
import {selectItemData} from "../redux/item/selectors";
import {ItemCartType} from "../assets/utils/componentDataType";

const ItemPage: React.FC = () => {
	const { id } = useParams() as { id: string }
	const dispatch = useAppDispatch()
	const { item, status } = useSelector(selectItemData)
	const getItem = async () => {
			dispatch(fetchItem(id))
	}
	const handleAddItemToCart = (obj: ItemCartType) => {
		dispatch(addItem(obj))
	}

	React.useEffect(() => {
		getItem()
	}, [])

	return (
		<>
			{status === 'error' ? (
				<ErrorInfo />
			) : (
				<>
					{status === 'completed' ? (
						<ItemBlock {...item} onClickAddItem={handleAddItemToCart} />
					) : (
						<ItemLoader />
					)}
				</>
			)}
		</>
	)
}

export default ItemPage
