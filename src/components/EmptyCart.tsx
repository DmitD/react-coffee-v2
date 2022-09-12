import React from 'react'
import { Link } from 'react-router-dom'

export const EmptyCart: React.FC = () => {
	return (
		<div className='cart cart--empty h100'>
			<h2>
				Корзина пустая <span>&#128521;</span>
			</h2>
			<p>
				Вероятней всего, вы не заказывали ещё кофе
				<br />
				Для того, чтобы заказать, перейдите на главную страницу
			</p>
			<div className='empty--image'></div>
			<Link to='/' className='button button--black'>
				<span>Вернуться назад</span>
			</Link>
		</div>
	)
}
