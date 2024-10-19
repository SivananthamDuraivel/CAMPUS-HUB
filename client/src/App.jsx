import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import ExamHallPlanner from './pages/HallPlanner/ExamHallPlanner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='auth' element={<Auth/>}></Route>
        <Route path='/examHallPlanner' element={<ExamHallPlanner/>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

