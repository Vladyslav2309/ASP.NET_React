import { Link } from "react-router-dom";
import "./DefaultHeader.css";

const DefaultHeader = () => {
    return (
        <>
            <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
        <Link className="navbar-brand" to="/">
        Магазинчик
        </Link>
        <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
    >
    <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
    <li className="nav-item">
    <Link className="nav-link active" aria-current="page" to="/categories/create">
        Додати
        </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/api/Auth/register">
                Реєстрація
            </Link>
        </li>
        </ul>
        <form className="d-flex" role="search">
    <input
        className="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    />
    <button className="btn btn-outline-success" type="submit">
        Search
        </button>

        </form>
        </div>
        </div>
        </nav>
        </header>
        </>
);
};
export default DefaultHeader;