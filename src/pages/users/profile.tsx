import { Login } from "../../compontents/Users/Login";
import { CuProfile } from "../../compontents/Users/Profile";
import {NavbarCl} from "../../compontents/Navbar/NavbarCl";

export function CustomerProfile() {
    const token = localStorage.getItem(`token`);

    return (
        <div className="d-flex" >
            {token ? <CuProfile /> : <Login />}
            <NavbarCl />

        </div>
    )}