/* eslint-disable prettier/prettier */
export const getModifiedCategories = (categories) => {
  return categories?.map((item) => {
    // this field for related products and manufacturer

    if (item?.subcategory?.parent?.title) {
      // this filed for subCategoriesChildren
      return {
        value: {
          _id: item?._id,
          name: item?.title,
        },
        label: item?.title,
      };
    }
    if (item?.parent?.title) {
      // this filed for subCategories

      return {
        value: { _id: item?._id, name: item?.title },
        label: item?.title,
      };
    }
    if (item?.title) {
      // this filed for categories

      return {
        value: { _id: item?._id, name: item?.title ? item?.title : item?.name },
        label: item?.title ? item?.title : item?.name,
      };
    }
    if (item?.price) {
      // this filed for size, colors
      return {
        value: item?._id,
        label: item?.name,
      };
    }

    
    if (item?.name) {
      // this filed for size, colors
      return {
        value: { _id: item?._id, name: item?.name },
        label: item?.name,
      };
    }

    return {
      value: { _id: item?._id, name: item?.title ? item?.title : item?.name },
      label: item?.title ? item?.title : item?.name,
    };
  });
};

export const getDefaultData = (data) => {
  const categoriesDefaultData = [];
  data?.forEach((d) => {
    categoriesDefaultData.push({ value: d, label: d.name });
  });
  return categoriesDefaultData;
};

export const getModifiedManufactures = (categories) => {
  const options = [{ label: "Pick one", value: null }];
  categories?.forEach((item) => {
    options.push({
      value: item?._id,
      label: item?.title ? item?.title : item?.name,
    });
  });

  return options;
};
