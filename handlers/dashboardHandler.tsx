import { AlertColor } from '@mui/material'
import { NextRouter } from 'next/router'
import { useEffect, useState } from 'react'
import api from '../pages/api'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: string[]
}

export const useItemsState = (customizedSnackbar:
(message: string, severity: AlertColor) => void,router:NextRouter) => {
	const [items, setItems] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			try {
				const auth = localStorage.getItem('authToken')
				if (auth) {
					const { status, data } = await api.get('/api/store-manager/item', {
						headers: {
							Authorization: auth,
						},
					})
					setItems(data)
				}
				else {
					customizedSnackbar("please login to view data",'info')
					router.push('/login')
				}
			} catch (error:any) {
				console.log(error)
			}
		}
		if (items.length == 0) fetchData()
	}, [items])
	return { items, setItems }
}
