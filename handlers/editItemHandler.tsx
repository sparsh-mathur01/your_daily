import api from '../pages/api'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: number
}

export const handleEdit = async (formState:itemType, setItems:any,customizedSnackbar:any) => {
	const auth = localStorage.getItem('authToken')
	if (auth) {
		try {
			const res = await api.put(
				`/api/store-manager/item/${formState.id}`,
				{
					category: formState.categoryID,
					imageId: formState.itemImageLinks,
					inStock: formState.inStock,
					name: formState.name,
					price: formState.price,
					baseQuantity: formState.baseQuantity.toString(),
					strikeThroughPrice: 100,
				},
				{
					headers: {
						Authorization: auth,
					},
				}
			)
		if (res.status == 201) {
				customizedSnackbar("item edited successfully",'success')
				setItems([])
			}
		} catch (error:any) {
			customizedSnackbar(error.message,'error')
		}
	}
}
