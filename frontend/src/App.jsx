import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import LandingPage from "./pages/Landing/Landing"
import AddPeople from "./pages/AddPeople/AddPeople"
import Auth from "./pages/Auth/Auth"
function App() {
  const {user} = useAuthContext()
  return(
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/auth" element={!user?<Auth/>:<Profile/>}></Route>
            <Route path="/profile" element={user?<Profile/>:<Navigate to="/"/>}></Route>
            <Route path="/addPeople" element={user?<AddPeople/>:<Navigate to="/"/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;