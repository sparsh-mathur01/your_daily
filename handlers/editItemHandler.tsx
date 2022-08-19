import api from '../pages/api'
import FormData from 'form-data'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: any
}

export const handleEdit = async (
	values: itemType,
	setItemData: any,
	customizedSnackbar: any
) => {
	const auth = localStorage.getItem('authToken')
	if (auth) {
		try {
			// const data = new FormData()
			// data.append('item', values.itemImageLinks)

			// const out = await api.post(
			// 	`/api/store-manager/item/image/${values.id}`,
			// 	data,
			// 	{
			// 		headers: {
			// 			Authorization: auth,
			// 		},
			// 	}
			// )

			const res = await api.put(
				`/api/store-manager/item/${values.id}`,
				{
					category: values.categoryID,
					inStock: values.inStock,
					name: values.name,
					price: values.price,
					baseQuantity: values.baseQuantity.toString(),
				},
				{
					headers: {
						Authorization: auth,
					},
				}
			)
			if (res.status == 201) {
				customizedSnackbar('item edited successfully', 'success')
				setItemData({
					...values,
					categoryID: values.categoryID,
					// itemImageLinks: out.data.imageURL,
					inStock: values.inStock,
					name: values.name,
					price: values.price,
					baseQuantity: values.baseQuantity.toString(),
				})
			}
		} catch (error: any) {
			customizedSnackbar(error.message, 'error')
		}
	}
}
