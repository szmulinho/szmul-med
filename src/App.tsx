import React from 'react';
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
import { GitHubUserProvider } from './context/Github';
import { GithubUserProfile } from './pages/github/profile';

function App() {

    return (
        <UserContextProvider>
            <GitHubUserProvider>
                <ShoppingCartProvider>
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
                                        <Route path="/home" element={<Home />} />
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
                                    </Routes>
                                </Container>
                            </div>
                        </div>
                    </div>
                    </DoctorContextProvider>
                </ShoppingCartProvider>
                </GitHubUserProvider>
        </UserContextProvider>

    );
}

export default App;
