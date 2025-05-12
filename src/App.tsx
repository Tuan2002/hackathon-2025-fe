import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRoute from './routes';
import FirstUpdateProfile from './features/account/FirstUpdateProfile';

function App() {
  return (
    <>
      <AppRoute />
      <FirstUpdateProfile />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  );
}

export default App;
