import {
	TableRow,
	Checkbox,
	IconButton,
	TableCell,
	styled,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { checkboxHandler, deleteHandler } from '../handlers/tableHandler'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import EditItemModal from './EditItemModal'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: string[]
}

export const ShowItem = (props: any) => {
	const MyTableCell = styled(TableCell)({
		borderBottomColor: 'white',
	})

	const { item, setItems, customizedSnackbar, showEditModal,setShowEditModal } = props
	const [itemData, setItemData] = useState(item)
	return (
		<>
			<TableRow key={itemData.id}>
				<MyTableCell align='center'>{itemData.id}</MyTableCell>
				<MyTableCell align='center'>
					<img
					width='40px'
					height='40px'
					src={itemData.itemImageLinks[0] ?? ''}></img>
				</MyTableCell>
				<MyTableCell align='center' component='th' scope='row'>
					{itemData.name}
				</MyTableCell>
				<MyTableCell align='center'>{itemData.baseQuantity}</MyTableCell>
				<MyTableCell align='center'>{itemData.price}</MyTableCell>
				<MyTableCell align='center'>
					<Checkbox
						onClick={() =>
							checkboxHandler(itemData, setItemData, setItems, customizedSnackbar)
						}
						color='secondary'
						checked={itemData.inStock}
					/>
				</MyTableCell>
				<MyTableCell align='center'>
					<IconButton
						onClick={() =>
							deleteHandler(itemData.id, setItems, customizedSnackbar)
						}>
						<DeleteIcon color='secondary' />
					</IconButton>
				</MyTableCell>
				<MyTableCell align='center'>
					<IconButton
						onClick={() => setShowEditModal({ open: true, itemData, setItemData })}>
						<EditIcon color='secondary' />
					</IconButton>
				</MyTableCell>
			</TableRow>
			
		</>
	)
}
