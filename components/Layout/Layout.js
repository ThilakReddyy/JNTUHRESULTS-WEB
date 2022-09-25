import Header from "../Header/Header";
import Nav from "./Nav";

const Layout=({children})=>{
    return (
        <>
        <Header />
        <Nav />
        {children}
        </>
    );
}
export default Layout;