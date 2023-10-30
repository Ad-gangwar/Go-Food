import Home from "./components/screen/Home";
import { BrowserRouter as Router,
  Routes, 
  Route} from "react-router-dom";
import Login from "./components/screen/Login";
import Signup from "./components/screen/Signup";
import MyOrders from './components/screen/myOrders'
import { CartProvider } from "./components/ContextReducer";
function App() {
  return (
    <CartProvider>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/myOrders" element={<MyOrders/>} /> 
        </Routes>
      </div>
    </Router>
    </CartProvider>
    
  );
}

export default App;
