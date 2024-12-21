import { BrowserRouter as Router ,Routes,Route, } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";


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
        <Route path='/forgot-password' element={<ForgotPassword/>} />
      

      </Routes>
     </Router>
    </>
  );
}

export default App;
