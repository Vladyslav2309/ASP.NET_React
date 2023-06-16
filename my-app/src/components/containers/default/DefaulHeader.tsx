import {Link, useNavigate} from "react-router-dom";
import "./DefaultHeader.css";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../../../store";
import {AuthUserActionType, IAuthUser} from "../../auth/types";
import http from "../../../http";

const DefaultHeader = () => {
        const  dispatch=useDispatch();
        const navigator = useNavigate();
    const logout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("token");
        http.defaults.headers.common["Authorization"] = ``;
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigator('/');
    };

    let {isAuth, user} = useSelector((store: any) => store.auth as IAuthUser);

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
                                        Додати категорію
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav mb-2 mb-md-0">
                                {isAuth ?
                                    (<>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/profile">
                                                {user?.email}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/logout" onClick={logout}>
                                                Вихід
                                            </Link>

                                        </li>
                                    </>)
                                    :
                                    (<>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page" to="/api/Auth/login">
                                                Вхід
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" aria-current="page"
                                                  to="/api/Auth/register">
                                                Реєстрація
                                            </Link>
                                        </li>
                                    </>)}
                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
        </>
    );

};
export default DefaultHeader;