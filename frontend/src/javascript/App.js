import { BrowserRouter,  Routes , Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import '../styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home.js'
import Update from './Update.js'

function App() {

  return (
    <BrowserRouter>
        <div className="App">
            <ToastContainer position="top-center" />
            <Routes> 
              <Route path="/" element={<Home />}> </Route>
              <Route path="/get/:id" element={<Update />}> </Route>
            </Routes>
        </div>
    </BrowserRouter>
    
  );
}

export default App;

