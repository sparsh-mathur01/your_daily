import api from '../pages/api'

export const addItemHandler = async (
	values: any,
	setItems: any,
	customizedSnackbar: any
) => {
	const auth = localStorage.getItem('authToken')
    console.log("authToken =>",auth)
	if (auth) {
        console.log("adding image",values)
		try {
			// const data = new FormData()
			// data.append('item', values.itemImageLinks)

			// const out = await api.post(
			// 	`/api/store-manager/image/item`,
			// 	data,
			// 	{
			// 		headers: {
			// 			Authorization: auth,
			// 		},
			// 	}
			// )

			const { status } = await api.post(
				'/api/store-manager/item',
				{
					category: values.categoryID,
					name: values.name,
					price: values.price,
					inStock: values.inStock,
					baseQuantity: values.baseQuantity.toString(),
					// imageId: out.body.imgID,
					imageId:22,
				},
				{
					headers: {
						Authorization: auth,
					},
				}
			)
			if (status == 201) {
				customizedSnackbar('Item added successfully', 'success')
				setItems([])
			}


		} catch (error: any) {
			customizedSnackbar(error.message, 'error')
		}
	}
}
