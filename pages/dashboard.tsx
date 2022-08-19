import styled from '@emotion/styled'
import {
	Button,
	Container,
	Stack,
	Typography,
	ThemeProvider,
} from '@mui/material'
import DataTable from '../components/CustomTable'
import { tabsTheme } from '../css/customThemes'
import FullWidthTabs from '../components/Tabs'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import AddItemModal from '../components/AddItemModal'
import { useItemsState } from '../handlers/dashboardHandler'
import { useState } from 'react'
import React from 'react'
import snackbarContext from '../shared/provider/snackProvider'


export default function dashboard() {
	const router = useRouter()
	


	const MyButton = styled(Button)({
		textTransform: 'none',
		fontSize: '15px',
		color: '#f88a12',
		borderColor: '#f88a12',
		'&:hover': {
			backgroundColor: 'secondary',
		},
	})

	const { customizedSnackbar } = React.useContext(snackbarContext)
	const { items, setItems } = useItemsState(customizedSnackbar,router)
	const [showAddModal, setShowAddModal] = useState(false)
	return (
		<>
			<Navbar />
			<Container sx={{ width: '100%', mt: '80px' }}>
				<Stack
					width='100%'
					justifyContent='space-around'
					direction='row'
					position='static'
					mb={3}>
					<MyButton variant='outlined' onClick={() => {
						if (localStorage.getItem('authToken')) router.push({
							pathname:'/dashboard',
							query:{
								category:'all'
							}
						})
						else router.push('/login')
					}}>
						Back
					</MyButton>
					<Typography variant='h2'>Items</Typography>
					<MyButton variant='outlined' onClick={() => setShowAddModal(true)}>
						+ Add New Item
					</MyButton>
				</Stack>

				<ThemeProvider theme={tabsTheme}>
					<FullWidthTabs items={items} />
					<DataTable items={items} setItems={setItems} />
					<AddItemModal
						showAddModal={showAddModal}
						setShowAddModal={setShowAddModal}
						setItems={setItems}
					/>
				</ThemeProvider>
			</Container>
		</>
	)
}
