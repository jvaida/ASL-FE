import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Test1 from './pages/Tests/TestOne'
import LessonOne from "./pages/Lessons/LessonOne";
import Test2 from './pages/Tests/TestTwo'
import LessonTwo from "./pages/Lessons/LessonTwo";
import Test3 from './pages/Tests/TestThree'
import LessonThree from "./pages/Lessons/LessonThree";
import GestureRecognition from './GestureRecognition'; // Import the new component


function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Routes> 
          <Route exact path="/" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/lesson1" element={<LessonOne />} /> 
          <Route path="/test1" element={<Test1 />} /> 
          <Route path="/lesson2" element={<LessonTwo />} /> 
          <Route path="/test2" element={<Test2 />} /> 
          <Route path="/lesson3" element={<LessonThree />} /> 
          <Route path="/test3" element={<Test3 />} /> 
          <Route path="/gestureRecognition" component={GestureRecognition} />

        </Routes>
      </header>
    </div>
  </Router>
  );
}

export default App;
