import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Pages/Home';
import CreateFolder from './Component/CreateFolder';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}> </Route>
                <Route path="/create-folder" element={<CreateFolder />} />
            </Routes>
        </Router>
    );
}

export default App;

