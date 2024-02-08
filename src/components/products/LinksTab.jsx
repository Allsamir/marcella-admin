import { CCol, CFormSelect, CRow } from "@coreui/react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { getDefaultData, getModifiedCategories, getModifiedManufactures } from "./data";
import { useGetAllCategoryQuery } from "src/redux/category/categoryApi";
import { useGetFilterSubCategoryQuery } from "src/redux/subCategory/subCategoryApi";
import { useGetFilterSubCategoryChildrenQuery } from "src/redux/subCategoryChildren/subCategoryChildrenApi";
import { useGetAllManufactureQuery } from "src/redux/manufacture/manufactureApi";
import { Button } from "react-bootstrap";
import { useState } from "react";

const statusOptions = [
  { value: "IN-STOCK", label: "In-stock" },
  { value: "OUT-OF-STOCK", label: "Out-of-stock" },
  { value: "PRE-ORDER", label: "Pre-order" },
];

const productTypeOptions = [
  { value: "regular-products", label: "Regular products" },
  { value: "popular-products", label: "Popular Products" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "featured-products", label: "Featured Products" },
];
const LinksTab = ({
  flashSale,
  flashSaleType,
  setFlashSaleType,
  errors,
  register,
  control,
  data,
  allTypes,
  selectedStatus,
  setSelectedStatus,
  manufacturer,
  setManufacturer,
  setActiveTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubChildrenCategory, setSelectedSubChildrenCategory] = useState("");

  const { data: categories } = useGetAllCategoryQuery();
  const { data: subcategories } = useGetFilterSubCategoryQuery(selectedCategory);
  const { data: subcategoriesChildren } = useGetFilterSubCategoryChildrenQuery(selectedSubCategory);
  const { data: manufacturers } = useGetAllManufactureQuery();

  // Category options
  const modifiedCategories = getModifiedCategories(categories?.result);
  // subcategory options
  const modifiedSubcategories = getModifiedCategories(subcategories?.result);
  // subcategory children options
  const modifiedSubcategoryChildren = getModifiedCategories(subcategoriesChildren?.result);
  // manufacturer options two arguments for find manufacturer

  const manufacturerOptions = getModifiedManufactures(manufacturers?.result);

  const typesOptions = [];
  allTypes?.forEach((t) => {
    typesOptions.push({ label: t.name, value: t.name });
  });

  const handlePrev = () => {
    setActiveTab(2);
  };
  const handleNext = () => {
    setActiveTab(4);
  };

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategory(selectedOptions);
    setSelectedSubCategory("");
    setSelectedSubChildrenCategory("");
  };

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubCategory(selectedOptions);
    setSelectedSubChildrenCategory("");
  };

  const handleSubChildrenCategoryChange = (selectedOptions) => {
    setSelectedSubChildrenCategory(selectedOptions);
  };

  return (
    <CRow className="g-3">
      {flashSale ? (
        <CCol xs={12}>
          <label className="mb-2">
            FlashSale type <span className="text-danger">*</span>
          </label>
          <CFormSelect
            aria-label="Product Select Selection Field"
            value={flashSaleType}
            onChange={(e) => setFlashSaleType(e.target.value)}
            required
            options={[{ value: '', label: 'Select' }, ...typesOptions]}
          />

          {errors.offerType?.type === "required" && (
            <p className="text-danger">{errors.offerType.message}</p>
          )}
        </CCol>
      ) : (
        <CCol xs={12}>
          <label className="mb-2">
            Product type <span className="text-danger">*</span>
          </label>
          <CFormSelect
            aria-label="Product Select Selection Field"
            options={productTypeOptions}
            {...register("productType", {
              required: true,
            })}
          />

          {errors.productType?.type === "required" && (
            <p className="text-danger">{errors.price.message}</p>
          )}
        </CCol>
      )}
      {/* if flash sale product use this form then no need category filed */}
      {!flashSale && (
        <CCol xs={12}>
          <CRow>
            <CCol xs={12}>
              <label className="mb-2">
                Categories <span className="text-danger">*</span>
              </label>
              <Controller
                control={control}
                name={"categories"}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    className="mt-2"
                    defaultValue={getDefaultData(data?.categories)}
                    inputRef={ref}
                    options={modifiedCategories}
                    value={modifiedCategories?.find((option) => option.value === value)}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions);
                      handleCategoryChange(selectedOptions.value._id);
                    }}
                  />
                )}
              />

              {errors.categories && <p className="text-danger">Category is required</p>}
            </CCol>
            <CCol xs={12} className="">
              <label className="w-100">Subcategories</label>
              <Controller
                control={control}
                name={"subcategories"}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    className="mt-2"
                    defaultValue={getDefaultData(data?.subcategories)}
                    inputRef={ref}
                    isDisabled={!selectedCategory}
                    options={modifiedSubcategories}
                    value={modifiedSubcategories?.find((option) => option.value === value)}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions);

                      handleSubCategoryChange(selectedOptions.value._id);
                    }}
                    // isMulti
                  />
                )}
              />

              {/* {errors.subcategories && <p className="text-danger">Subcategory is required</p>} */}
            </CCol>
            <CCol xs={12} className="">
              <label className="w-100">Subcategory Children</label>
              <Controller
                control={control}
                name={"subcategoryChildren"}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Select
                    className="mt-2"
                    defaultValue={getDefaultData(data?.subcategoryChildren)}
                    inputRef={ref}
                    isDisabled={!selectedSubCategory}
                    options={modifiedSubcategoryChildren}
                    value={modifiedSubcategoryChildren?.find((option) => option.value === value)}
                    onChange={(selectedOptions) => {
                      onChange(selectedOptions);
                      // const selectedValues = selectedOptions
                      //   ? selectedOptions.map((option) => option.value?._id)
                      //   : [];
                      handleSubChildrenCategoryChange(selectedOptions.value._id);
                    }}
                    // isMulti
                  />
                )}
              />
            </CCol>
          </CRow>
        </CCol>
      )}
      <CCol xs={12}>
        <CFormSelect
          label="Brand"
          aria-label="Product Select Selection Field"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target?.value)}
          options={manufacturerOptions}
        />
      </CCol>
      <CCol xs={12}>
        <label className="mb-2">
          Status <span className="text-danger">*</span>
        </label>
        <CFormSelect
          aria-label="Product Select Selection Field"
          options={statusOptions}
          {...register("status", {
            required: { value: true, message: "Status is required" },
          })}
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        />
        {errors.status?.type === "required" && (
          <p className="text-danger">{errors.status.message}</p>
        )}
      </CCol>

      <div className="d-flex justify-content-end gap-2">
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </CRow>
  );
};

export default LinksTab;
