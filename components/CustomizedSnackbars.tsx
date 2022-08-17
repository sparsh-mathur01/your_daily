import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


interface props{
  showSnackbar: boolean
  severity: string
  message: string
  }


export default function CustomizedSnackbars({snackBarState,setSnackBarState}:{
  snackBarState:{
    open:boolean,
    severity:AlertColor,
    message:string
  },
  setSnackBarState:React.Dispatch<React.SetStateAction<{
    open: boolean;
    severity: AlertColor;
    message: string;
}>>
}) {

   
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setSnackBarState({...snackBarState, open:false});
  };

  return (
      <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"left" }} open={snackBarState.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackBarState.severity} sx={{ width: '100%' }}>
          {snackBarState.message}
        </Alert>
      </Snackbar>
  );
}
















// import { Snackbar, Alert, AlertColor } from '@mui/material'

// export default function CustomSnackBar({showSnackBar,severity,message,setSnackBarState}:{
//     showSnackBar: boolean;
//     severity: AlertColor;
//     message: string;
//     setSnackBarState: Dispatch<SetStateAction<{
//         showSnackBar: boolean;
//         severity: AlertColor;
//         message: string;
//     }>>;
// }) {
// 	const handleClose = () => {
//         setSnackBarState({showSnackBar:false})
//     }

// 	return (
// 		<Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleClose}>
// 			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
// 				{message}
// 			</Alert>
// 		</Snackbar>
// 	)
// }
