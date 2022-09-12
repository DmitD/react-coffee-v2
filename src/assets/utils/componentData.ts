import {SortItemType} from "./componentDataType";

export const categoryNames = [
	'Все',
	'Зерновой',
	'Молотый',
	'Органический',
	'Без кофеина',
]

export const sortItems: SortItemType[] = [
	{ name: 'популярности', type: 'rating', order: 'desc' },
	{ name: 'цене', type: 'smPrice', order: 'desc' },
	{ name: 'алфавиту', type: 'title', order: 'asc' },
]

export const availableTypes = ['зерно', 'молотый']

export const availableWeight = ['sm', 'md', 'lg']
