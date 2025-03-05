import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";
import Profile from "./pages/Profile";
import LandingPage from "./pages/Landing/Landing"
import AddPeople from "./pages/AddPeople/AddPeople"
import Auth from "./pages/Auth/Auth"
import ExamHallPlanner from './pages/HallPlanner/ExamHallPlanner';
import TimeTable from './pages/TimeTable/TimeTable'
import CreateEvent from './pages/CreateEvent/CreateEvent'
import Admin from './pages/AdminLanding/AdminLanding'
import ViewUsers from './pages/ViewUsers/ViewUsers'
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Sample from "./components/Sample/Sample";
import StudyMaterial from './pages/StudyMaterialFeature/StudyMaterial/StudyMaterial';
import Questions from './pages/Questions/Questions';
import Management from './pages/Management/Management'
import "./App.css"

function App() {
  const {user} = useAuthContext()
  if(user) {
    console.log("User Exists")
  }
  else {
    console.log("User does not exists")
  }
  return(
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes> 
            <Route path="/profile" element={user?<Profile/>:<Navigate to="/"/>}></Route>
            <Route path="/addPeople" element={user?<AddPeople/>:<LandingPage/>}/>
            <Route path="/examHallPlanner" element={user?<ExamHallPlanner/>:<LandingPage/>}></Route>
            <Route path='/studyMaterial' element={user? <StudyMaterial/> : <LandingPage/>}></Route>
            <Route path='/question' element={user ? <Questions/> : <LandingPage/>}></Route>
            <Route path="/createEvent" element={user?<CreateEvent/>:<LandingPage/>}></Route>
            <Route path="/timetable" element={user?<TimeTable/>:<LandingPage/>}></Route>
            <Route path="/viewUsers" element={user?<ViewUsers/>:<LandingPage/>}></Route>
            <Route path="/admin" element={user?<Admin/>:<LandingPage/>}></Route>
            <Route path="/management" element={user?<Management/>:<LandingPage/>}></Route>
            <Route path="/sample" element={user?<Sample/>:<LandingPage/>}></Route>
            <Route path="/auth" element={!user?<Auth/>:<Navigate to = "/" />}></Route>
            <Route path="/" element={user?<Admin/>:<LandingPage/>}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;