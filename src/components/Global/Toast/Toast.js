import React, { useState, useEffect } from 'react';
import styles from './Toast.module.scss';
// import checkIcon from './assets/check.svg';
// import errorIcon from './assets/error.svg';
// import infoIcon from './assets/info.svg';
// import warningIcon from './assets/warning.svg';

// {
//     status: 'Success',
//     description: 'This is a success toast component',
// }

const Toast = props => {
    const { open, status, message, autoDelete, handleClose } = props;
    const [show, setShow] = useState(false)
    const [background, setBackground] = useState('green')
    const [icon, setIcon] = useState()

    useEffect(() => {
        setShow(open)
        switch (status) {
            case 'Success':
                setBackground('#3CAD2A');
                setShow(true)
                // setIcon(<checkIcon />)
                break;
            case 'Warning':
                setBackground('#DF954B')
                setShow(true)
                // setIcon(<warningIcon />)
                break;
            case 'Danger':
                setBackground('#C74243')
                setShow(true)
                // setIcon(<errorIcon />)
                break;
            default:
                setBackground('#3DABC6')
                setShow(true)
                // setIcon(<infoIcon />)
        }
    }, [status, open]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete) {
                deleteToast();
            }
        }, 1600);
        
        return () => {
            clearInterval(interval);
        }
    }, [autoDelete]);

    const deleteToast = () => {
        setShow(false)
        handleClose()
    }
    return (
        <>
            {show ? (
                <div className={`${styles.notificationContainer} ${styles.toastPosition}`}>
                    <div className={`${styles.notification} ${styles.toast}`} style={{ backgroundColor: background }}>
                        <button onClick={() => deleteToast()}>
                            X
                        </button>
                        <div className={styles.notificationImage}>
                        
                        </div>
                        <div>
                            <p className={styles.notificationTitle}>{status}</p>
                            <div className={styles.notificationMessage}>
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            ) : ''}
        </>
    );
}

export default Toast;