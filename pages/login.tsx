import { Person, Visibility, VisibilityOff } from '@mui/icons-material'
import {
	Button,
	Typography,
	Box,
	Card,
	Container,
	Grid,
	TextField,
	InputLabel,
	InputAdornment,
	IconButton,
	Stack,
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import illustrator from '../public/assets/images/Illustrator1/Illustrator1@2x.png'
import logo from '../public/assets/images/whitebg.svg'
import { fetchUser } from '../handlers/loginHandler'
import snackbarContext from '../shared/provider/snackProvider'
import React from 'react'

const Home: NextPage = () => {
	const [state, setState] = useState({ username: '', password: '' })
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const { customizedSnackbar } = React.useContext(snackbarContext)

	return (
		<Box component='div' width='100%' height='100%'>
			<Grid container spacing={2}>
				<Grid item xs={3} height='100px'>
					<Image src={logo} width='250px' height='106px'></Image>
				</Grid>
				<Grid item xs={9}></Grid>
			</Grid>

			<Stack
				width='90%'
				direction={{ md: 'row', sm: 'column', xs: 'column' }}
				spacing={2}
				justifyContent='space-evenly'
				alignItems='center'>
				<Container
					style={{
						marginLeft: '50px',
					}}>
					<Image src={illustrator} width='724px' height='507px' />
				</Container>

				<Card
					sx={{
						margin: 'auto',
						alignSelf: 'center',
						justifySelf: 'center',
						width: '445px',
						height: '418px',
						boxShadow: '12px 9px 27px #7777774D',
						padding: '20px',
						paddingTop: '40px',
					}}>
					<Typography
						variant='h1'
						sx={{
							font: 'normal normal normal 28px/17px Museo Sans 700',
						}}>
						LOGIN
					</Typography>
					<Typography
						variant='h6'
						sx={{
							marginTop: '10px',
							color: '#1D2226',
							opacity: '0.6',
						}}>
						Please login to your account
					</Typography>

					<TextField
						sx={{ marginTop: '40px', width: '100%' }}
						label='UserName'
						color='secondary'
						placeholder='enter your user id'
						onChange={(e) => setState({ ...state, username: e.target.value })}
						value={state.username}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<Person />
								</InputAdornment>
							),
						}}
					/>

					<TextField
						sx={{ marginTop: '40px', width: '100%' }}
						label='Password'
						color='secondary'
						placeholder='enter your password'
						onChange={(e) => setState({ ...state, password: e.target.value })}
						type={showPassword ? 'text' : 'password'}
						value={state.password}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge='end'>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button
						variant='contained'
						sx={{
							background:
								'transparent linear-gradient(180deg, #F88A12 0%, #CD2D05 100%) 0% 0% no-repeat padding-box',
							marginTop: '30px',
							width: '100%',
							opacity: '1',
							borderRadius: '5',
						}}
						onClick={async () =>
							await fetchUser(
								state.username,
								state.password,
								customizedSnackbar,
								router
							)
						}>
						<Typography sx={{ opacity: '1' }}>Login</Typography>
					</Button>

					<Typography
						variant='h6'
						sx={{
							marginTop: '10px',
							opacity: '0.6',
							color: '#F88A12',
							textAlign: 'right',
						}}>
						Forgot Password?
					</Typography>
				</Card>
			</Stack>
		</Box>
	)
}

export default Home
