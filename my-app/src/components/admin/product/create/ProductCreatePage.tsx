import {Link} from "react-router-dom";
import ProductFileImputGroup from "../common/ProductFileImputGroup";

const ProductCreatePage=()=>{
    return(
        <>
            <h1 className={"text-center"}>Список продуктів</h1>
          <div>
              <ProductFileImputGroup/>
          </div>
        </>
    );
}
export default ProductCreatePage;
