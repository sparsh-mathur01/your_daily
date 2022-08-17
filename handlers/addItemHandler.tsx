import api from '../pages/api'

export const addItemHandler = async (values:any,  setItems:any,customizedSnackbar:any) => {
    const auth = localStorage.getItem('authToken')
    if (auth) {
        try {
            const { status } = await api.post(
                '/api/store-manager/item',
                {
                    category: values.categoryID,
                    name: values.name,
                    price: values.price,
                    inStock: values.inStock,
                    baseQuantity: values.baseQuantity.toString(),
                    imageId: values.itemImageLinks,
                },
                {
                    headers: {
                        Authorization: auth,
                    },
                }
            )
            if (status == 201) {
                customizedSnackbar("Item added successfully",'success')
                setItems([])
            }
        } catch (error:any) {
            customizedSnackbar(error.message,'error')
        }
    }
}

