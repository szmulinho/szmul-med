import {Routes, Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import {Home} from "./pages/home";
import {Pharmacy} from "./pages/pharmacy";
import {Clinic} from "./pages/clinic";
import {Navbar} from "./compontents/Navbar/Navbar"
import {Contact} from "./pages/contact"
import {About} from "./pages/about"
import {ShoppingCartProvider} from "./context/ShoppingCartContext";
import {Presc} from "./pages/presc";
import {ShowPresc} from "./pages/show_presc";
import {ShowPrescID} from "./compontents/ShowPrescID";
import {ShowAllDrugs} from "./compontents/ShowAllDrugs";
import { NavbarCl } from "./compontents/Navbar/NavbarCl";
import {Show_presc_id} from "./pages/show_presc_id";
import {Show_all_drugs} from "./pages/show_all_drugs";
import { Add_drug } from "./pages/add_drug";
import {Delete_presc} from "./pages/delete_presc";
import {Delete_drug} from "./pages/delete_drug";
import {Update_drug} from "./pages/update_drug";

function App() {
 return (
     <>
         <ShoppingCartProvider>
     <Navbar />
     <Container className="mb4">
   <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/pharmacy" element={<Pharmacy />}/>
     <Route path="/clinic" element={<Clinic />}/>
       <Route path="/contact" element={<Contact />}></Route>
       <Route path="/about" element={<About />}></Route>
       <Route path="/clinic/add_presc" element={<Presc />}></Route>
       <Route path="/clinic/show_presc" element={<ShowPresc />}></Route>
       <Route path="/clinic/show_presc_id" element={<Show_presc_id />}></Route>
       <Route path="/clinic/show_all_drugs" element={<Show_all_drugs />}></Route>
       <Route path="/clinic/add_drug" element={<Add_drug/>}></Route>
       <Route path="/clinic/delete_presc" element={<Delete_presc/>}></Route>
       <Route path="/clinic/delete_drug" element={<Delete_drug/>}></Route>
       <Route path="/clinic/update_drug" element={<Update_drug/>}></Route>
   </Routes>
  </Container>
         </ShoppingCartProvider>
     </>
 )}

export default App
