import { Button, Stack, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {

	const router = useRouter();

	useEffect(()=>{
		router.push('/login')
		})
		
		return (
			<>
			{/* <Stack alignItems='center' p={40}>
				<Button onClick={()=>router.push('/login')} variant='contained' color='success'>
					Home page
				</Button>
			</Stack> */}
		</>
	)
}

export default Home
