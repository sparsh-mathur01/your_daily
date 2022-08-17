import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import styled from '@emotion/styled'
import { Checkbox, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditItemModal from './EditItemModal'
import snackbarContext from '../shared/provider/snackProvider'
import { checkboxHandler, deleteHandler } from '../handlers/tableHandler'
import { useRouter } from 'next/router'


interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: string[]
}

export default function BasicTable({
	items,
	setItems,
}: {
	items: any
	setItems: any
}) {
	const [showEditModal, setShowEditModal] = useState({
		open: false,
		item: {
			id: 0,
			name: '',
			categoryID: 0,
			inStock: false,
			price: 0,
			baseQuantity: 0,
			itemImageLinks: [''],
		},
	})
	const router = useRouter()
	const tabValue=router.query.category
	const { customizedSnackbar } = React.useContext(snackbarContext)

	const MyTableHeaders = styled(TableCell)({
		fontWeight: 'bolder',
		borderBottomColor: 'white',
	})

	const MyTableCell = styled(TableCell)({
		borderBottomColor: 'white',
	})

	return (
		<>
			<TableContainer sx={{ mt: 3 ,width:"100%"}}>
				<Table aria-label='simple table'>
					<TableHead>
						<TableRow>
							<MyTableHeaders align='center'>S.No </MyTableHeaders>
							<MyTableHeaders align='center'>Image</MyTableHeaders>
							<MyTableHeaders align='center'>Vegetable's Name</MyTableHeaders>
							<MyTableHeaders align='center'>Base Qty.</MyTableHeaders>
							<MyTableHeaders align='center'>
								Price (per base qty)
							</MyTableHeaders>
							<MyTableHeaders align='center'>In Stock</MyTableHeaders>
							<MyTableHeaders align='center'>Delete</MyTableHeaders>
							<MyTableHeaders align='center'>Edit</MyTableHeaders>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map(
							(item: itemType) =>
								((tabValue=="all") || (tabValue == "others" && item.categoryID > 2) ||
								(tabValue == "vegetables" && item.categoryID ==1) || (tabValue == "fruits" && item.categoryID == 2))&&(
									<TableRow key={item.id}>
										<MyTableCell align='center'>{item.id}</MyTableCell>
										<MyTableCell align='center'>
											<img
												width='40px'
												height='40px'
												src={item.itemImageLinks[0]}></img>
										</MyTableCell>
										<MyTableCell align='center' component='th' scope='row'>
											{item.name}
										</MyTableCell>
										<MyTableCell align='center'>
											{item.baseQuantity}
										</MyTableCell>
										<MyTableCell align='center'>{item.price}</MyTableCell>
										<MyTableCell align='center'>
											<Checkbox
												onClick={() => checkboxHandler(item, setItems,customizedSnackbar)}
												key={item.id}
												color='secondary'
												checked={item.inStock}
											/>
										</MyTableCell>
										<MyTableCell align='center'>
											<IconButton
												onClick={() => deleteHandler(item.id, setItems,customizedSnackbar)}>
												<DeleteIcon color='secondary' />
											</IconButton>
										</MyTableCell>
										<MyTableCell align='center'>
											<IconButton
												onClick={() => setShowEditModal({ open: true, item })}>
												<EditIcon color='secondary' />
											</IconButton>
										</MyTableCell>
									</TableRow>
								)
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<EditItemModal
				setItems={setItems}
				editModalState={showEditModal}
				setEditModalState={setShowEditModal}
			/>
		</>
	)
}
