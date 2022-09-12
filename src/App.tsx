import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import Home from './pages/Home'
import ItemPage from './pages/ItemPage'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import './scss/app.scss'

const App = () => {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<Routes>
					<Route path='/react-coffee-v2' element={<Home />} />
					<Route path='/coffee/:id' element={<ItemPage />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
