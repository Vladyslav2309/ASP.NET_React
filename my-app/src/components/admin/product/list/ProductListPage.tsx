import { Link } from "react-router-dom";

const ProductListPage = () => {
    return (
        <>
            <h1 className={"text-center"}>Список продуктів</h1>
            <Link to={"create"} className={"btn btn-success"}>Додати</Link>
    </>
)
}
export default ProductListPage;
