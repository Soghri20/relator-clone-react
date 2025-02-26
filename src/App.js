import { BrowserRouter as Router ,Routes,Route, } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import CreatingListing from "./pages/CreatingListing";
import EditsListing from "./pages/EditsListing";

function App() {
  return (
    <>
     <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/profile' element={<PrivateRoute />}>
           <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='/create-listing' element={<PrivateRoute />}>
           <Route path="/create-listing" element={<CreatingListing />} />
        </Route>
        <Route path='/edit-listing' element={<PrivateRoute />}>
           <Route path="/edit-listing/:listingId" element={<EditsListing />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      </Routes>
     </Router>
     <ToastContainer
         position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
        />
    </>
  );
}

export default App;
