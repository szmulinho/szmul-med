import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Home} from "./pages/Home";
import {Pharmacy} from "./pages/Pharmacy";
import {Clinic} from "./pages/Clinic";
import {Navbar} from "./compontents/Navbar/Navbar"

function App() {
 return (
     <>
     <Navbar />
     <Container className="mb4">
   <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/pharmacy" element={<Pharmacy />}/>
     <Route path="/clinic" element={<Clinic />}/>
   </Routes>
  </Container>
     </>
 )}

export default App
