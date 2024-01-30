/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import { CForm } from "@coreui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Tab, Tabs } from "react-bootstrap";
import { memo } from "react";
import { getModels } from "src/utils/getReactQuilModel";
import GeneralTab from "./GeneralTab";
import DataTab from "./DataTab";
import LinksTab from "./LinksTab";
import ImageTab from "./ImageTab";
import DiscountTab from "./DiscountTab";

const AddProductForm = ({
  data,
  onSubmit,
  productTags,
  setProductTags,
  images,
  setImages,
  description,
  setDescription,
  shortDescription,
  setShortDescription,
  specification,
  setSpecification,

  selectedStatus,
  setSelectedStatus,
  setRemainingImages,
  remainingImages,
  manufacturer,
  setManufacturer,

  slugValue,
  setSlugValue,

  // flash sale props
  setFlashSaleType,
  flashSaleType,
  flashSale,
  allTypes,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    if (data) {
      for (const key in data) {
        if (key === "expireDate") {
          setValue(key, new Date(data[key]).toLocaleDateString());
        }

        if (key === "flashSaleOfferType") {
          setValue(key, data[key]);
        } else {
          setValue(key, data[key]);
        }
      }
    }
  }, [data, setValue]);

  // AllTypes OPTIONS for FlashSale products

  // import modules for react quill
  const modules = getModels();

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <CForm id="addProductForm1" onSubmit={handleSubmit(onSubmit)}>
      <Tabs
        onSelect={(e) => handleTabSelect(e)}
        activeKey={activeTab}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {/* General tab */}
        <Tab eventKey={0} title="General">
          <GeneralTab
            register={register}
            modules={modules}
            errors={errors}
            description={description}
            setDescription={setDescription}
            shortDescription={shortDescription}
            setShortDescription={setShortDescription}
            specification={specification}
            setSpecification={setSpecification}
            productTags={productTags}
            setProductTags={setProductTags}
            setActiveTab={setActiveTab}
            slugValue={slugValue}
            setSlugValue={setSlugValue}
          />
        </Tab>
        {/* Data tab */}
        <Tab eventKey={1} title="Data">
          <DataTab
            register={register}
            control={control}
            errors={errors}
            color={data?.color}
            size={data?.size}
            setActiveTab={setActiveTab}
          />
        </Tab>

        {/* Discount tags */}
        <Tab eventKey={2} title="Product">
          <DiscountTab errors={errors} register={register} setActiveTab={setActiveTab} />
        </Tab>

        {/* Links tags */}
        <Tab eventKey={3} title="Links">
          <LinksTab
            errors={errors}
            register={register}
            control={control}
            data={data}
            setFlashSaleType={setFlashSaleType}
            flashSaleType={flashSaleType}
            flashSale={flashSale}
            allTypes={allTypes}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            manufacturer={manufacturer}
            setManufacturer={setManufacturer}
            setActiveTab={setActiveTab}
          />
        </Tab>

        {/* Images tab */}
        <Tab eventKey={4} title="Image">
          <ImageTab
            errors={errors}
            register={register}
            data={data}
            remainingImages={remainingImages}
            setRemainingImages={setRemainingImages}
            images={images}
            setImages={setImages}
            setActiveTab={setActiveTab}
            setValue={setValue}
          />
        </Tab>

        {/* Reward point tab */}
        {/* <Tab eventKey={"rewardPoints"} title="Reward Points">
          <CRow className="g-3">
            <CCol xs={12}>
              <CFormInput
                type="Number"
                id="rewardPointsInputField"
                label="Reward Points"
                placeholder="Enter Reward Points"
                aria-describedby="rewardPointsInputField"
                min={"0"}
                {...register("rewardPoints")}
              />
            </CCol>
          </CRow>
        </Tab> */}
      </Tabs>

      {/* <div className="text-end">
        <CancelButton />
        <CButton
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
          type="submit"
          color="primary"
          className="mt-3"
        >
          <CIcon icon={cilPlus} className="me-2" />
          {loading ? "Loading..." : " Save"}
        </CButton>
      </div> */}
    </CForm>
  );
};

export default memo(AddProductForm);

AddProductForm.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func,
};
