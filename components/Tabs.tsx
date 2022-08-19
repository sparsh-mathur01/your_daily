import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import snackbarContext from '../shared/provider/snackProvider'

interface itemType {
	id: number
	name: string
	categoryID: number
	inStock: boolean
	price: number
	baseQuantity: number
	itemImageLinks: string[]
}

export default function FullWidthTabs({ items }: { items: itemType[] }) {
	const router = useRouter()
	const { customizedSnackbar } = React.useContext(snackbarContext)
	const MyTab = styled(Tab)(({ theme }) => ({
		fontWeight: 'bold',
	}))
	return (
		<Tabs
			value={router.query.category ?? "all"}
			onChange={(e, newValue) => {
				router.push({
					query: {
						category: newValue,
					},
				})
			}}
			indicatorColor='secondary'
			textColor='secondary'
			centered>
			<MyTab
				value={'all'}
				label={`all(
        ${items.length}
        )`}
				id='tab-0'
			/>
			<MyTab
				value={'vegetables'}
				label={`Vegetables(${
					items.filter((i: { categoryID: number }) => i.categoryID === 1).length
				})`}
				id='tab-1'
			/>
			<MyTab
				value={'fruits'}
				label={`Fruits(${
					items.filter((i: { categoryID: number }) => i.categoryID === 2).length
				})`}
				id='tab-2'
			/>
			<MyTab
				value={'others'}
				label={`Others(${
					items.filter(
						(i: { categoryID: number }) =>
							i.categoryID !== 2 && i.categoryID !== 1
					).length
				})`}
				id='tab-3'
			/>
		</Tabs>
	)
}
