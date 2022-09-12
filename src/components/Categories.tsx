import React from 'react'

type CategoriesProps = {
	items: string[];
	activeCategory: number;
	onClickCategory: (index: number) => void
}

export const Categories: React.FC<CategoriesProps> = React.memo(props => {
	const { items, activeCategory, onClickCategory } = props
	return (
		<div className='categories'>
			<ul>
				{items &&
					items.map((name, index) => (
						<li
							key={`${name}_${index}`}
							className={activeCategory === index ? 'active' : ''}
							onClick={() => onClickCategory(index)}
						>
							{name}
						</li>
					))}
			</ul>
		</div>
	)
})
