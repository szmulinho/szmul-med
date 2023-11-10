import React, { useEffect } from 'react';
import {Routes, Route, BrowserRouter, Router} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { DoctorContextProvider } from './context/DoctorContext';
import { Home } from "./pages/home";
import { Pharmacy } from "./pages/pharmacy";
import { Clinic } from "./pages/clinic";
import { Navbar } from "./compontents/Navbar/Navbar";
import { Contact } from "./pages/contact";
import { About } from "./pages/about";
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
import { UserContextProvider} from "./context/UserContext";
import { DoctorLogin} from "./compontents/Doctors/DocLog";
import { Profile } from "./pages/doctors/profile";
import { Choose } from "./pages/login";
import {useContext, useState} from "react";
import { Check } from "./pages/doctors/check";
import {CustomerProfile} from "./pages/users/profile";
import {Add_Order} from "./pages/orders/order";
import {Add_Feedback} from "./pages/feedback/feedback";
import { GithubUserContextProvider } from './context/Github';
import { GithubUserProfile } from './pages/github/profile';
import axios from 'axios';
import {ApapProfile} from "./compontents/Drugs/DrugProfile/ApapProfile";
import {IbupromProfile} from "./pages/drugs/ibuprom";
import {GlimbaxProfile} from "./pages/drugs/glimbax";
import {VitaminD3Profile} from "./pages/drugs/vitaminD3";
import {CirrusProfile} from "./pages/drugs/cirrus";
import {TabcinProfile} from "./pages/drugs/tabcin";
import { MagneB6Profile } from './pages/drugs/magneb6';

function App() {
    const [drugs, setDrugs] = useState([]);

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await axios.get('https://szmul-med-drugstore.onrender.com/drugs'); // Replace with your API endpoint
                setDrugs(response.data);
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        };

        fetchDrugs();
    }, []);

    return (
        <UserContextProvider>
            <GithubUserContextProvider>
                <ShoppingCartProvider drugs={drugs}>
                    <DoctorContextProvider>
                    <Navbar />
                    <div className="d-flex">
                        <div className="flex-grow-1 d-flex justify-content-center m-4">
                            <div className="w-100">
                                <Container className="my-4">
                                    <Routes>
                                        <Route path="/clinic" element={<Clinic />} />
                                        <Route path="/clinic/show_presc" element={<ShowPresc />} />
                                        <Route path="/clinic/show_presc_id" element={<Show_presc_id />} />
                                        <Route path="/clinic/show_all_drugs" element={<Show_all_drugs />} />
                                        <Route path="/clinic/add_drug" element={<Add_drug />} />
                                        <Route path="/clinic/delete_presc" element={<Delete_presc />} />
                                        <Route path="/clinic/delete_drug" element={<Delete_drug />} />
                                        <Route path="/clinic/update_drug" element={<Update_drug />} />
                                        <Route path="/pharmacy" element={<Pharmacy />} />
                                        <Route path="/" element={<Home />} />
                                        <Route path="/contact" element={<Contact />} />
                                        <Route path="/about" element={<About />} />
                                        <Route path="/clinic/add_presc" element={<Presc />} />
                                        <Route path="/order" element={<Add_Order />} />
                                        <Route path="/login" element={<Log />} />
                                        <Route path="/doctor_log" element={<DoctorLogin />} />
                                        <Route path="/register" element={<Register />} />
                                        <Route path="/doctor" element={<Profile />} />
                                        <Route path="/profile" element={<CustomerProfile />} />
                                        <Route path="/log" element={<Choose />} />
                                        <Route path="/check" element={<Check />} />
                                        <Route path="/opinion" element={<Add_Feedback />} />
                                        <Route path="/github_user" element={<GithubUserProfile />} />
                                        <Route path="/drug/apap" element={<ApapProfile />} />
                                        <Route path="/drug/ibuprom" element={<IbupromProfile />} />
                                        <Route path="/drug/Glimbax" element={<GlimbaxProfile />} />
                                        <Route path="/drug/vitamin D3" element={<VitaminD3Profile />} />
                                        <Route path="/drug/cirrus" element={<CirrusProfile />} />
                                        <Route path="/drug/tabcin" element={<TabcinProfile />} />
                                        <Route path="/drug/magne B6" element={<MagneB6Profile />} />
                                    </Routes>
                                </Container>
                            </div>
                        </div>
                    </div>
                    </DoctorContextProvider>
                </ShoppingCartProvider>
                </GithubUserContextProvider>
        </UserContextProvider>

    );
}

export default App;
