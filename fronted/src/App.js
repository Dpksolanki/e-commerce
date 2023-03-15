import './App.css';
import Nav from './components/Nav.js';
import SignUp from './components/SignUp.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import Footer from './components/Footer.js';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/Product';
import UpdateProduct from './components/Update';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {/* <Footer/> */}

        <Routes>
          <Route element={<PrivateComponent />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/logout" element={<h1>logout componenst</h1>} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/profile" element={<h1>Profile components</h1>} />
          <Route path="/login" element={<Login />} />
          <Route />


          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
