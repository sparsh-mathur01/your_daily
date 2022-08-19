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
import { ShowItem } from './ShowItem'

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
		itemData: {
			id: 0,
			name: '',
			categoryID: 0,
			inStock: false,
			price: 0,
			baseQuantity: 0,
			itemImageLinks: [''],
		},
		setItemData:()=>{}
	})
	const router = useRouter()
	const tabValue = router.query.category
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
			<TableContainer sx={{ mt: 3, width: '100%' }}>
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
								(tabValue == 'all' ||
									(tabValue == 'others' && item.categoryID > 2) ||
									(tabValue == 'vegetables' && item.categoryID == 1) ||
									(tabValue == 'fruits' && item.categoryID == 2)) && (
									<ShowItem
										key={item.id}
										item={item}
										setItems={setItems}
										customizedSnackbar={customizedSnackbar}
										showEditModal={showEditModal}
										setShowEditModal={setShowEditModal}
									/>
								)
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<EditItemModal
				editModalState={showEditModal}
				setEditModalState={setShowEditModal}
			/>
		</>
	)
}
