import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/home";
import { Pharmacy } from "./pages/pharmacy";
import { Clinic } from "./pages/clinic";
import { Navbar } from "./compontents/Navbar/Navbar";
import { Contact } from "./pages/contact";
import { About } from "./pages/about";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Presc } from "./pages/prescs/presc";
import { ShowPresc } from "./pages/prescs/show_presc";
import { Show_presc_id } from "./pages/prescs/show_presc_id";
import { Show_all_drugs } from "./pages/drugs/show_all_drugs";
import { Add_drug } from "./pages/drugs/add_drug";
import { Delete_presc } from "./pages/prescs/delete_presc";
import { Delete_drug } from "./pages/drugs/delete_drug";
import { Update_drug } from "./pages/drugs/update_drug";
import { Log } from "./pages/users/login";
import { Register } from "./pages/users/register";
import { UserContextProvider } from "./context/UserContext";
import { DocLog } from "./compontents/Doctors/DocLog";
import { Profile } from "./pages/doctors/profile";
import { Choose } from "./pages/login";
import { User } from "./data/prescription";
import { NavbarCl } from "./compontents/Navbar/NavbarCl";
import { useState } from "react";
import { Check } from "./pages/doctors/check";

function App() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContextProvider>
            <ShoppingCartProvider>
                <Navbar />
                <Container className="mb4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pharmacy" element={<Pharmacy />} />
                        <Route path="/clinic" element={<Clinic />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/clinic/add_presc" element={<Presc />} />
                        <Route path="/clinic/show_presc" element={<ShowPresc />} />
                        <Route path="/clinic/show_presc_id" element={<Show_presc_id />} />
                        <Route path="/clinic/show_all_drugs" element={<Show_all_drugs />} />
                        <Route path="/clinic/add_drug" element={<Add_drug />} />
                        <Route path="/clinic/delete_presc" element={<Delete_presc />} />
                        <Route path="/clinic/delete_drug" element={<Delete_drug />} />
                        <Route path="/clinic/update_drug" element={<Update_drug />} />
                        <Route path="/login" element={<Log />} />
                        <Route path="/doctor_log" element={<DocLog />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/doctor" element={<Profile />} />
                        <Route path="/log" element={<Choose />} />
                        <Route path="/check" element={<Check />} />
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </UserContextProvider>
    );
}

export default App;
