import "./product_screen.screen.scss";
// import { Models } from "imports/model.import";
import productAllData from "../../Json/products.json";

import { useSetState } from "../../utils/functions.utils";
import { CreateProductModal, Input } from "utils/imports.utils";
import Assets from "imports/asset.import";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import _ from "lodash";
const ProductScreen = () => {
  // hook form
  const [state, setState] = useSetState({
    productOriginal: productAllData,
    productData: productAllData,
    search_value: "",
  });
  let ProductCheck: Record<string, string[]> = {
    name: [],
    code: [],
  };
  const modalRef: any = useRef();

  // if (isLoading) return <div>loading....</div>;
  const debounced = useDebouncedCallback((search_value: string) => {
    filterProduct(search_value);
  }, 500);
  const filterProduct = (search: string) => {
    let filterData = state.productOriginal.filter((product: any) => {
      let name = product.name.toLowerCase();
      return name.includes(search.toLowerCase());
    });
    setState({ productData: !_.isEmpty(search) ? filterData : state.productOriginal });
  };

  return (
    <div className="product_container">
      <div className="product_header">
        <div className="search_header">
          <Input
            onChange={(search_value: string) => {
              debounced(search_value);
              setState({search_value: search_value})
            }}
            type="text"
            // value={state.search_value}
            name="subject"
            placeholder="Search Name"
            icon={Assets.searchIcon}
          />
        </div>
        <div className="create_product" onClick={() => modalRef?.current.openModal()}>
          <img src={Assets.plusIcon} height={18} width={18} alt="" />
          <div className="create_product_btn">Create Product</div>
        </div>
      </div>
      <div className="product_wrapper">
        {state.productData.map((item: Record<string, any>, _id: number) => {
          ProductCheck.name.push(item.name);
          ProductCheck.code.push(item.code);
          return (
            <div className="product-card" key={_id}>
              <img src={item.img} alt="" />
              <div className="desc">
                <span>{item.name}</span>
                <h5>{item.code}</h5>
                <div className="categories">
                  {item.categories.map((data: any) => (
                    <h5>{data}</h5>
                  ))}
                </div>
                <p>{item.desc}</p>
              </div>
              <a href="#">
                <i className="fa-solid fa-cart-shopping"></i>
              </a>
            </div>
          );
        })}
      </div>
      <CreateProductModal
        ref={modalRef}
        productData={ProductCheck}
        onClick={(e: Record<string, any>) => {
          setState({ productData: [...state.productData, e], productOriginal: [...state.productOriginal, e] });
          filterProduct(state.searc_value)
        }}
      />
    </div>
  );
};

export default ProductScreen;
