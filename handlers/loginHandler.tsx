import { AlertColor } from '@mui/material'
import { NextRouter } from 'next/router'
import api from '../pages/api/index'

export async function fetchUser(
	username: string,
	password : string,
	customizedSnackbar: (message: string, severity: AlertColor) => void,
	router: NextRouter
) {

	try {
		const res = await api.post('api/sm-login', {
			email: username,
			password: password,
		})

		if (res.status == 200) {
			const authToken = res.data.Authorization
			localStorage.setItem('authToken', authToken)
			customizedSnackbar('successfully logged in..','success')
			router.push({
				pathname: '/dashboard',
				query: {
					category: 'all',
				},
			})
		}
	} catch (error:any) {
		customizedSnackbar("username or password is incorrect", 'error')
	}
}
