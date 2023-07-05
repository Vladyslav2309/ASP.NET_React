import './styles.scss';
import {Link} from "react-router-dom";

const ForbiddenPage = () => {
    return (
        <div className={"forbidden"}>
            <header className="intro">
                <h1 className="intro__headline">403</h1>
                <p className="intro__subhead">Вам відмовлено в доступі</p>
                <Link to="/" >Повернутися на головну</Link>
            </header>

            <section id="lemmehaveit" className="lemmehaveit">
                <div id="cupcake-canvas" className="cupcake-canvas">
                    <div className="cupcake-svg-container">
                        <svg id="cupcake-svg" className="cupcake-svg" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 594 289">
                            <g fill="none" fillRule="evenodd">
                                <g id="cupcake-cupcake-cupcake" className="cupcake-cupcake-cupcake"
                                   transform="translate(221 147)">
                                    <polygon fill="#A46D91" points="0 0 150 0 126.118 77 23.882 77"
                                             transform="translate(0 65)"/>
                                    <g transform="translate(1)">
                                        <path fill="#D9B4E1"
                                              d="M147,65 C123.473567,32.3476562 123.042443,7.11328125 75.1325742,7.11328125 C27.222705,7.11328125 27.222705,32.3476562 1,65 C-0.851102327,67.3049807 1.7660192,69.8579856 3.1870857,72.013148 C6.73935714,77.4004553 16.084946,68.9072536 26.0901308,72.013148 C31.3734779,73.6532495 32.9551445,82.12837 39.2992966,83.1323032 C44.9367211,84.0244001 62.6215036,77.7331905 68.7159306,78.1229607 C73.896699,78.4542977 89.5299688,78.1546256 94.8015576,78.1229607 C100.338778,78.0897002 106.606709,78.5567275 111.995257,78.1229607 C116.56518,77.7550916 119.180045,78.7788902 123.473567,78.1229607 C127.261922,77.5442066 128.082452,75.8504403 131.541654,75.0474233 C135.985692,74.015787 136.936236,79.5247328 140.63558,78.1229607 C151.98734,73.821501 152.232256,72.2618497 147,65 Z"/>
                                        <ellipse cx="75.5" cy="7" fill="#FF0000" rx="8.5" ry="7"/>
                                    </g>
                                </g>
                                <rect id="cupcake-box" className="cupcake-box" width="230" height="170" fill="#A78C84"
                                      transform="translate(182 119)"/>
                            </g>
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ForbiddenPage;
