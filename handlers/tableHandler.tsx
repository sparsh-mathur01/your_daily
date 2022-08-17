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

export const deleteHandler = async (id:number,setItems:any,customizedSnackbar:any) => {
		const auth = localStorage.getItem('authToken')
		try {
			if (auth) {
				await api.delete(`/api/store-manager/item/${id}`, {
					headers: {
						Authorization: auth,
					},
				})
                customizedSnackbar("item deleted successfully",'success')
				setItems([])
			}
		} catch (error:any) {
            customizedSnackbar(error.message,'error')
		}
}

export const checkboxHandler = async (item:itemType,setItems:any,customizedSnackbar:any) => {
    const auth = localStorage.getItem('authToken')

    try {
        if (auth) {
            const res = await api.put(
                `/api/store-manager/item/${item.id}`,
                {
                    category: item.categoryID,
                    imageId: item.itemImageLinks,
                    inStock: !item.inStock,
                    name: item.name,
                    price: item.price,
                    baseQuantity: item.baseQuantity,
                    strikeThroughPrice: 100,
                },
                {
                    headers: {
                        Authorization: auth,
                    },
                }
            )
            setItems([])
            customizedSnackbar("Item's inStock  updated successfully!", 'success')
        }
    } catch (error:any) {
        customizedSnackbar(error.message,'error')
    }
}
