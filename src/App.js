import './App.css';
import FavPage from './components/FavPage';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import ContactUs from './components/ContactUs';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/fav-list' element={<FavPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/details/:id' element={<ProductDetails />} />
      <Route path='/contact' element={<ContactUs />} />
      </Routes>
      <Footer />
      </BrowserRouter>
     </div>
  );
}

export default App;
