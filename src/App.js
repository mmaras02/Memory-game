import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element = {<Home />}></Route>
            <Route exact path="/game" element= {<Game />}> </Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
