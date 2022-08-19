import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Checkbox, FormControlLabel, Input, styled } from '@mui/material'
import * as yup from 'yup'
import { handleEdit } from '../handlers/editItemHandler'
import snackbarContext from '../shared/provider/snackProvider'
import { Formik, Form } from 'formik'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: string[]
}

export default function EditItemModal({
	editModalState,
	setEditModalState,
}: {
	editModalState: {
		open: boolean
		itemData: itemType
		setItemData: any
	}
	setEditModalState: any
}) {
	const { customizedSnackbar } = React.useContext(snackbarContext)

	const MyButton = styled(Button)(
		({ theme }) => `
    color: ${theme.palette.secondary.main};
    border: 1px solid ${theme.palette.secondary.main};
  `
	)

	const validationSchema = yup.object({
		categoryID: yup.number().required().min(1),
		name: yup.string().required(),
		price: yup.number().required(),
		baseQuantity: yup.number().required(),
	})

	return (
		<div>
			<Dialog
				open={editModalState.open}
				onClose={() => setEditModalState({ open: false, itemData: {} })}>
				<DialogTitle>Edit Item Details</DialogTitle>

				<Formik
					initialValues={{
						id: editModalState.itemData.id,
						name: editModalState.itemData.name,
						categoryID: editModalState.itemData.categoryID,
						inStock: editModalState.itemData.inStock,
						price: editModalState.itemData.price,
						baseQuantity: editModalState.itemData.baseQuantity,
						itemImageLinks: '',
					}}
					onSubmit={(values) => {
						setEditModalState({ open: false, itemData: {} })
						handleEdit(values, editModalState.setItemData, customizedSnackbar)
					}}
					validationSchema={validationSchema}>
					{({ values, errors, handleChange, setFieldValue }) => (
						<Form>
							<DialogContent>
								<DialogContentText>
									All details are mandatory to fill.
								</DialogContentText>
								<TextField
									autoFocus
									margin='dense'
									id='categoryID'
									label='categoryID'
									type='number'
									value={values.categoryID}
									onChange={handleChange}
									error={!!errors.categoryID}
									helperText={!!errors.categoryID && errors.categoryID}
									fullWidth
									variant='standard'
								/>
								<TextField
									autoFocus
									margin='dense'
									id='name'
									label='Name'
									type='text'
									value={values.name}
									onChange={handleChange}
									error={!!errors.name}
									helperText={!!errors.name && errors.name}
									fullWidth
									variant='standard'
								/>

								<TextField
									autoFocus
									margin='dense'
									id='price'
									label='Price(per base Qty)'
									type='number'
									value={values.price}
									onChange={handleChange}
									error={!!errors.price}
									helperText={!!errors.price && errors.price}
									fullWidth
									variant='standard'
								/>
								<FormControlLabel
									value='inStock'
									control={
										<Checkbox
											onChange={handleChange}
											defaultChecked={values.inStock}
										/>
									}
									label='In Stock'
									labelPlacement='top'
									sx={{ ml: 0, mt: 1 }}
								/>
								<TextField
									autoFocus
									margin='dense'
									id='baseQuantity'
									label='Base Qty'
									type='number'
									value={values.baseQuantity}
									onChange={handleChange}
									error={!!errors.baseQuantity}
									helperText={!!errors.baseQuantity && errors.baseQuantity}
									fullWidth
									variant='standard'
								/>

								<TextField
									autoFocus
									margin='dense'
									id='itemImageLinks'
									name='itemImageLinks'
									type='file'
									onChange={(event) =>
										setFieldValue('itemImageLinks', event.target.files[0])
									}
									helperText='Image'
									variant='standard'
								/>
							</DialogContent>
							<DialogActions>
								<MyButton
									onClick={() =>
										setEditModalState({ open: false, itemData: {} })
									}>
									Cancel
								</MyButton>
								<MyButton type='submit'>Edit</MyButton>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</div>
	)
}
