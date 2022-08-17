import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Checkbox, FormControlLabel, styled } from '@mui/material'
import { addItemHandler } from '../handlers/addItemHandler'
import snackbarContext from '../shared/provider/snackProvider'
import { Form, Formik } from 'formik'
import * as yup from 'yup'

export default function AddItemModal({
	showAddModal,
	setShowAddModal,
	setItems,
}: {
	showAddModal: boolean
	setShowAddModal: any
	setItems: any
}) {
	const MyButton = styled(Button)(
		({ theme }) => `
		color: ${theme.palette.secondary.main};
		border: 1px solid ${theme.palette.secondary.main};
		`
	)

	const { customizedSnackbar } = React.useContext(snackbarContext)

	const validationSchema = yup.object({
		categoryID: yup.number().required().min(1),
		name: yup.string().required(),
		price: yup.number().required(),
		baseQuantity: yup.number().required(),
		itemImageLinks: yup.number().required(),
	})

	return (
		<Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
			<DialogTitle>Add Item Details</DialogTitle>
			<Formik
				initialValues={{
					id: 0,
					name: 'check',
					categoryID: null,
					inStock: true,
					price: 100,
					baseQuantity: 90,
					itemImageLinks: 30,
				}}
				onSubmit={(values) => {
					setShowAddModal(false)
					addItemHandler(values, setItems, customizedSnackbar)
				}}
				validationSchema={validationSchema}>
				{({
					values,
					errors,
					handleChange,
				}) => (
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
							<MyButton onClick={() => setShowAddModal(false)}>Cancel</MyButton>
							<MyButton type='submit'>Add</MyButton>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	)
}