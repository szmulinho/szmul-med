import { Container } from "react-bootstrap";
import {NavbarCl} from "../../compontents/Navbar/NavbarCl";
import {ShowPrescID} from "../../compontents/Prescriptions/Show/ShowPrescID";

export function Show_presc_id() {
    return <h1>
        <NavbarCl />
            <ShowPrescID />
        </h1>
}