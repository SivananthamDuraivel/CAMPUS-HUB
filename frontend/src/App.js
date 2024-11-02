import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import LandingPage from "./pages/Landing/Landing"
import Auth from "./pages/Auth/Auth"
import ExamHallPlanner from './pages/HallPlanner/ExamHallPlanner';
function App() {
  const {user} = useAuthContext()
  return(
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="/auth" element={!user?<Auth/>:<Profile/>}></Route>
            <Route path="/profile" element={user?<Profile/>:<Navigate to="/"/>}></Route>
            <Route path="/examHallPlanner" element={<ExamHallPlanner/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;