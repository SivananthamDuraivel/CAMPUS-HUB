import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Construction from "./pages/Construction";
import LandingPage from "./pages/Landing/Landing"
function App() {
  const {user} = useAuthContext()
  return(
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/login" element={!user?<Login/>:<Profile/>}></Route>
            <Route path="/register" element={!user?<Signup/>:<Profile/>}></Route>
            <Route path="/profile" element={user?<Profile/>:<Navigate to="/"/>}></Route>
            <Route path="/construction" element={<Construction/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;