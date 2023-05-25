import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar"

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <NavBar />
            {children}
        </>
    );
}
export default Layout;