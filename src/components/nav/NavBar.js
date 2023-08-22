
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localUser = localStorage.getItem("capstone_user");
    const userObject = JSON.parse(localUser);

    if (userObject.isStaff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }
}