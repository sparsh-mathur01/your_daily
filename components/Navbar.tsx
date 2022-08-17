import {
	AlertColor,
	AppBar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useState } from 'react'
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import logo from '../public/assets/images/shortlogo.png'
import { useRouter } from 'next/router'
import snackbarContext from '../shared/provider/snackProvider'

export default function Navbar() {
	const router = useRouter()
	const [logOutOpen, setLogOutOpen] = useState(false)
	const { customizedSnackbar } = React.useContext(snackbarContext)

	return (
		<>
			<AppBar
				position='fixed'
				sx={{
					background: '#F88A12 0% 0% no-repeat padding-box',
					height: '60px',
				}}>
				<Toolbar>
					<IconButton size='large' edge='start' aria-label='logo'>
						<img src={logo.src}></img>
					</IconButton>

					<Typography
						color='white'
						variant='h6'
						component='div'
						flexGrow='1'
						fontSize='24px'>
						Dashboard
					</Typography>

					<IconButton
						size='large'
						edge='start'
						aria-label='user'
						sx={{ mr: 1 }}>
						<PersonAddAltOutlinedIcon sx={{ color: grey[50] }} />
					</IconButton>

					<IconButton
						onClick={() => setLogOutOpen(true)}
						size='large'
						edge='start'
						aria-label='log-out'
						sx={{ mr: 1 }}>
						<LogoutIcon sx={{ color: grey[50] }} />
					</IconButton>
				</Toolbar>
			</AppBar>

			<Dialog open={logOutOpen} onClose={() => setLogOutOpen(false)}>
				<DialogContent>
					<DialogContentText>
						Do you want to logout from the session?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						sx={{ color: '#f88a12', borderColor: '#f88a12' }}
						onClick={() => setLogOutOpen(false)}>
						No
					</Button>
					<Button
						sx={{ color: '#f88a12', borderColor: '#f88a12' }}
						onClick={() => {
							localStorage.clear()
							router.push('/login')
							customizedSnackbar("successfully logged out","success")
						}}
						autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
