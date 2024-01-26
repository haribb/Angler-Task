import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

import { toastify, toastifyError, useSetState } from "utils/functions.utils";
import { DropDown, Input, PrimaryButton, TextArea, Validations } from "utils/imports.utils";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./create_product_modal.ui.scss";
import axios from "axios";
import Assets from "imports/asset.import";
import _ from "lodash";
import { PRODUCT_RESPONSE, categoriesData } from "utils/constant.utils";
const InviteModal = forwardRef((props: any, ref) => {
  // Reference
  const modalRef: any = useRef();
  const inputRef: any = useRef(null);
  // let query = useQuery();
  // let req_id = query.get("req_id");
  //Redux
  // State
  const [state, setState] = useSetState({
    isModalOpen: false,
    errorArray: [],
    image: "",
    url: "",
    name: "",
    code: "",
    price: "",
    brand: "",
    categories: "",
    desc: "",
    urlPresent: false,
  });

  const cloundinaryUpload = () => {
    const data = new FormData();
    data.append("file", inputRef.current || "");
    data.append("upload_preset", "x64ctvpl");
    data.append("cloud_name", "qbd4yd4e");
    axios({
      method: "post",
      url: "https://api.cloudinary.com/v1_1/dqbd4yd4e/image/upload",
      data: data,
    })
      .then((res) => {
        setState({ url: res.data.url, urlPresent: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const imageUploader = (e: any) => {
    
    if (e.target.files[0].size >= 3000000) {
      return toastifyError("Maximum size is 3MB");
    }
    setState({ image: e.target.files[0] });
    inputRef.current = e.target.files[0];
    
    cloundinaryUpload();
  };
  // useEffect(() => {}, [state.url, state]);
  //Hooks
  useEffect(() => {
    // getAllAgency();
    setState({ agency: [] });
  }, []);

  // Network req

  useImperativeHandle(ref, () => ({
    openModal() {
      setState({ isModalOpen: true });
    },
    closeModal() {
      setState({ isModalOpen: false });
    },
  }));

  const handleSubmit = async () => {
    try {
      let body: any = {
        name: state.name,
        code: state.code,
        img: state.url,
        desc: state.desc,
      };

      await Validations.createProduct.validate(body, {
        abortEarly: false,
      });
      if (_.isEmpty(state.url)) {
        toastifyError("Please Upload Image");
        return;
      }

      if (_.isEmpty(state.categories)) {
        let error = new Error();
        Object.assign(error, { inner: [{ message: PRODUCT_RESPONSE.EMPTY_CATEGORIES, path: "categories" }] });
        throw error;
      } else {
        body.categories = !_.isEmpty(state.categories) ? state.categories.map((item: Record<string, string>) => item.value) : [];
      }
      if (_.includes(props.productData.name, state.name)) {
        let error = new Error();
        Object.assign(error, { inner: [{ message: PRODUCT_RESPONSE.UNIQUE_NAME, path: "name" }] });
        throw error;
      }
      if (_.includes(props.productData.code, state.code)) {
        let error = new Error();
        Object.assign(error, { inner: [{ message: PRODUCT_RESPONSE.UNIQUE_CODE, path: "code" }] });
        throw error;
      }
      setState({ isModalOpen: false });
      setState({ name: "", code: "", categories: [], desc: "", url: "", urlPresent: false });
      props.onClick(body);
      toastify("Product Successfully Created");
    } catch (error) {
      let errorArray = _.isEmpty(state.categories)
        ? [...JSON.parse(JSON.stringify(error))?.inner, { message: PRODUCT_RESPONSE.EMPTY_CATEGORIES, path: "categories" }]
        : JSON.parse(JSON.stringify(error))?.inner;
      setState({ errorArray });
      setTimeout(() => {
        setState({ errorArray: [] });
      }, 3000);
    }
  };

  return (
    <div>
      <Modal
        open={state.isModalOpen}
        ref={modalRef}
        onClose={() => {
          setState({ isModalOpen: false });
        }}
        closeOnOverlayClick
        center
        showCloseIcon={false}
        classNames={{
          overlay: "customOverlay",
          modal: "customModalAgency",
        }}
      >
        <div className="invite_agency_container">
          <div className="invite_wrapper">
            <div className="invite_header">
              <div className="invite_heading">Create Product</div>
            </div>
            <div className="wrapper_field">
              <div className="image_uploader" onClick={() => inputRef?.current.click()}>
                {!state.urlPresent ? <img src={Assets.accountIcon} alt="user-profile"></img> : <img src={state.url} alt="upload"></img>}
                <input
                  style={{ display: "none" }}
                  className="upload_input"
                  ref={inputRef}
                  type="file"
                  onChange={(e) => {
                    imageUploader(e);
                  }}
                ></input>
              </div>
              <div className="name">
                <div className="invite_subheading">
                  Name<span className="required_field">*</span>
                </div>
                <Input
                  onChange={(name: String) => {
                    setState({
                      name,
                    });
                  }}
                  type="text"
                  value={state.name}
                  name="name"
                  error={state.errorArray}
                />
              </div>
              <div className="product_code">
                <div className="invite_subheading">
                  Code<span className="required_field">*</span>
                </div>
                <Input
                  onChange={(code: String) => {
                    setState({
                      code,
                    });
                  }}
                  type="text"
                  value={state.code}
                  name="code"
                  error={state.errorArray}
                />
              </div>
              <div className="product_category">
                <div className="invite_subheading">
                  Categories<span className="required_field">*</span>
                </div>
                <DropDown
                  data={categoriesData}
                  value={state.categories}
                  isMulti
                  setActive={(categories: any) => {
                    setState({ categories });
                  }}
                  name="categories"
                  error={state.errorArray}
                />
              </div>
              <div className="product_description">
                <div className="invite_subheading">Description</div>
                <TextArea
                  onChange={(e: any) => {
                    setState({
                      desc: e.target.value,
                    });
                  }}
                  type="text"
                  name="desc"
                />
              </div>
            </div>
            <div className="send_button">
              <PrimaryButton
                text={"Cancel"}
                className={"send_invite_button"}
                onClick={
                  () => setState({ isModalOpen: false })
                  // handleSubmit()
                }
                backgroundColor="#cfcfcf"
                color={"black"}
                width={100}
              />
              <PrimaryButton text={"Save"} className={"send_invite_button"} onClick={handleSubmit} width={100} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default InviteModal;
