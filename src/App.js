import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route exact path="/" element= {<Home />}> </Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
