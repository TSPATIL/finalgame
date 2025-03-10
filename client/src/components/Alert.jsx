import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector} from 'react-redux'
import { clearAlert, selectAlertMessage, selectAlertType } from '../Redux/features/Alerts/AlertSlice';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

export default function Alert() {
    const message = useSelector(selectAlertMessage);
    const type = useSelector(selectAlertType);
    const dispatch = useDispatch();

    useEffect(() => {
        if(message != ''){
            switch(type){
                case 'success': {
                    toast.success(message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                }
                case 'error': {
                    toast.error(message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                }
                case 'warn': {
                    toast.warn(message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                }
                case 'info': {
                    toast.info(message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    break;
                }
                default:{
                    toast(message, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
            dispatch(clearAlert());
        }
    }, [message, type]);

    // const showAlert = (e) => {
        // toast.success('Wow so easy !', {
        //     position: "top-center",
        //     // autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        // });
    // }
    return (
        <div className='Alert'>
            <ToastContainer
                newestOnTop={false}
                rtl={false}
                // pauseOnFocusLoss
                theme="light"
                transition={Bounce}  
            />
            {/* <button className='bg-white w-fit h-fit p-5 absolute' onClick={showAlert}>Hello</button> */}
        </div>
    )
}
