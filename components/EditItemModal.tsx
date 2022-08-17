import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Checkbox, FormControlLabel, styled } from '@mui/material'
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
	setItems,
	editModalState,
	setEditModalState,
}: {
	setItems: any
	editModalState: {
		open: boolean
		item: itemType
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
		itemImageLinks: yup.number().required(),
	})

	return (
		<div>
			<Dialog
				open={editModalState.open}
				onClose={() => setEditModalState({ open: false, item: {} })}>
				<DialogTitle>Edit Item Details</DialogTitle>

				<Formik
					initialValues={{
						id: editModalState.item.id,
						name: editModalState.item.name,
						categoryID: editModalState.item.categoryID,
						inStock: editModalState.item.inStock,
						price: editModalState.item.price,
						baseQuantity: editModalState.item.baseQuantity,
						itemImageLinks: 20,
					}}
					onSubmit={(values) => {
						setEditModalState({ open: false, item: {} })
						handleEdit(values, setItems, customizedSnackbar)
					}}
					validationSchema={validationSchema}>
					{({ values, errors, handleChange }) => (
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
									label='Image'
									type='number'
									value={values.itemImageLinks}
									onChange={handleChange}
									error={!!errors.itemImageLinks}
									helperText={!!errors.itemImageLinks && errors.itemImageLinks}
									fullWidth
									variant='standard'
								/>
							</DialogContent>
							<DialogActions>
								<MyButton
									onClick={() => setEditModalState({ open: false, item: {} })}>
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

{
	/* <DialogContent>
					<DialogContentText>
						All details are mandatory to fill.
					</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='category'
						label='category'
						type='number'
						value={formState.categoryID}
						onChange={onChangeHandler('categoryID',formState,setFormState)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Name'
						type='text'
						value={formState.name}
						onChange={onChangeHandler('name',formState,setFormState)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						id='price'
						label='Price(per base Qty)'
						type='number'
						value={formState.price}
						onChange={onChangeHandler('price',formState,setFormState)}
						fullWidth
						variant='standard'
					/>
					<FormControlLabel
						value='inStock'
						control={
							<Checkbox
								onChange={onChangeHandler('inStock',formState,setFormState)}
								checked={!!formState.inStock}
							/>
						}
						label='In Stock'
						labelPlacement='top'
						sx={{ ml: 0, mt: 1 }}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='baseQty'
						label='Base Qty'
						type='number'
						value={formState.baseQuantity}
						onChange={onChangeHandler('baseQuantity',formState,setFormState)}
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						id='img'
						label='Image'
						type='number'
						value={formState.itemImageLinks}
						onChange={onChangeHandler('itemImageLinks',formState,setFormState)}
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<MyButton onClick={()=>setEditModalState({ open: false, item: {} })}>Cancel</MyButton>
					<MyButton onClick={()=>handleEdit(formState, setEditModalState, setItems,customizedSnackbar)}>Edit</MyButton>
				</DialogActions> */
}
