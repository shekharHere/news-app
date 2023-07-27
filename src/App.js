import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      {/* <Routes>
        <Route exact path='/science' element={<News key='science' country={'in'} category={'science'}/>}></Route>
        <Route exact path='/health' element={<News key='health' country={'in'} category={'health'}/>}></Route>
        <Route exact path='/technology' element={<News key='technology' country={'in'} category={'technology'}/>}></Route>
        <Route exact path='/business' element={<News key='business' country={'in'} category={'business'}/>}></Route>
        <Route exact path='/entertainment' element={<News key='entertainment' country={'in'} category={'entertainment'}/>}></Route>
        <Route exact path='/sports' element={<News key='sports' country={'in'} category={'sports'}/>}></Route>
        <Route exact path='/general' element={<News key='general' country={'in'} category={'general'}/>}></Route>
      </Routes> */}
        {/* <News/> */}
    </Router>
    </>
  );
}

export default App;
