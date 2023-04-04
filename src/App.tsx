import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Home} from "./pages/home";
import {Pharmacy} from "./pages/pharmacy";
import {Clinic} from "./pages/clinic";
import {Navbar} from "./compontents/Navbar/Navbar"
import {Contact} from "./pages/contact"

function App() {
 return (
     <>
     <Navbar />
     <Container className="mb4">
   <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/pharmacy" element={<Pharmacy />}/>
     <Route path="/clinic" element={<Clinic />}/>
       <Route path="/contact" element={<Contact />}></Route>
   </Routes>
  </Container>
     </>
 )}

export default App
