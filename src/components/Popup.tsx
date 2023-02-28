import { useContext, useState } from 'react';
import { passwordENV } from '../service/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth, AuthProvider } from '../hooks/AuthContext';

interface PopupProps {
  title: string;
  content: string;
}

function Popup({ title, content }: PopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState<string>('');
  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const { postLocalStorage, pin, isPinInLocalStorage, isPinValid } = useAuth()
  const handleAuth = () => {
    if (password === passwordENV){
        postLocalStorage(password)
        isPinInLocalStorage(password)
        toast('🔒 AU-TÊN-TI-CA-DO!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }else{
        toast.error('Senha incorreta!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
  }

  return (
    <>
      <button onClick={togglePopup}>Login</button>
      {/* <p className="read-the-docs" onClick={togglePopup}>Open Popup</p> */}
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-header">
                <h2>{title}: {pin}</h2>
                <button className='exit-popup' onClick={togglePopup}>X</button>
            </div>
            <p>{content}</p>

            <div className="auth-group">
                <input
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Senha' type="text" className='input-lg' />
                <button onClick={handleAuth}>Enviar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
