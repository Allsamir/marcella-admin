/* eslint-disable prettier/prettier */

import { lazy } from "react";

import AddCoupons from "./views/coupons/add-coupons/AddCoupons";
import ManageCoupons from "./views/coupons/manage-coupons/ManageCoupons";
import AddCustomerGroup from "./views/customergroup/add-customergroup/AddCustomerGroup";
import ManageCustomerGroup from "./views/customergroup/manager-customergroup/ManageCustomerGroup";
import Mail from "./views/mail/Mail";
import ManageSalesByCategory from "./views/reports/sales/manageSales/ManageSalesByCategory";
import ManageSalesByProduct from "./views/reports/sales/manageSales/ManageSalesByProduct";
import ManageSalesCustomer from "./views/reports/sales/manageSales/ManageSalesCustomer";
import EditShipping from "./views/reports/sales/shipping/addShipping/EditShipping";
import ManageShipping from "./views/reports/sales/shipping/manageShipping/ManageShipping";
import Settings from "./views/settings/Settings";

// My Routes
const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));

// flash sale
const ManageFlashSaleTypes = lazy(
  () => import("./views/flashSale/flash-sale-types/manage-types/ManageFlashSaleTypes"),
);
const AddFlashSaleTypes = lazy(
  () => import("./views/flashSale/flash-sale-types/addTypes/AddFlashSaleTypes"),
);
const ManageFlashSaleProduct = lazy(
  () =>
    import(
      "./views/flashSale/all-flashSalse-products/manage-flashSale-products/ManageFlashSaleProducts"
    ),
);
const AddFlashSaleProduct = lazy(
  () =>
    import("./views/flashSale/all-flashSalse-products/add-flashSale-products/AddFlashSaleProducts"),
);

const ManageFlashSaleOffer = lazy(
  () =>
    import("./views/flashSale/showAll-flashSale-offer/manage-flashSale-offer/ManageFlashSaleOffer"),
);
const AddFlashSaleOffer = lazy(
  () =>
    import("./views/flashSale/showAll-flashSale-offer/add-flashSale-offer/CreateFlashSaleOffer"),
);

// pages path
const AllBlogs = lazy(() => import("./views/blogs/ManageBlogs"));
const AddBlog = lazy(() => import("./views/blogs/AddBlogs"));
const AllPrivacy = lazy(() => import("./views/privacy-policy/ManagePrivacyPolicy"));
const AddPrivacy = lazy(() => import("./views/privacy-policy/AddPrivacyPolicy"));
const AllReturns = lazy(() => import("./views/return/ManageReturn"));
const AddReturn = lazy(() => import("./views/return/AddReturn"));
const AllStoreLocation = lazy(() => import("./views/storeLocation/ManageStoreLocation"));
const AddStoreLocation = lazy(() => import("./views/storeLocation/AddStoreLocation"));
const AllDeliveryInfo = lazy(() => import("./views/deliveryInformation/ManageDeliveryInfo"));
const AddDeliveryInfo = lazy(() => import("./views/deliveryInformation/AddDelevieryInfo"));
const ManageFaq = lazy(() => import("./views/faq/ManageFaq"));
const AddFaq = lazy(() => import("./views/faq/AddFaq"));

// variants
const AllSize = lazy(() => import("./views/size/ManageSize"));
const AddSize = lazy(() => import("./views/size/AddSize"));
const AllColor = lazy(() => import("./views/color/ManageColor"));
const AddColor = lazy(() => import("./views/color/AddColor"));

const TermConditions = lazy(() => import("./views/terms&condition/ManageTerms&Conditions"));
const AddTermConditions = lazy(() => import("./views/terms&condition/AddTerm&Conditions"));

const ManageProducts = lazy(() => import("./views/products/manage-products/ManageProducts"));
const AddProduct = lazy(() => import("./views/products/add-product/AddProduct"));
const ManageCategories = lazy(
  () => import("./views/categories/manage-categories/ManageCategories"),
);
const AddCategory = lazy(() => import("./views/categories/add-category/AddCategory"));
const ManageSubcategories = lazy(
  () => import("./views/subcategories/manage-subcategories/ManageSubcategories"),
);
const AddSubcategory = lazy(() => import("./views/subcategories/add-subcategory/AddSubcategory"));

const ManageSubcategoriesChildren = lazy(
  () =>
    import("./views/subCategoryChildren/manage-subcategory-children/ManageSubcategoryChildren.jsx"),
);
const AddSubcategoryChildren = lazy(
  () => import("./views/subCategoryChildren/add-subcategory-children/AddSubCategoryChildren.jsx"),
);

// Banner routes
const ManageDesktopBanner = lazy(
  () => import("./views/desktop-banner/manage-desktop-banner/ManageDesktopBanner.jsx"),
);
const AddDesktopBanner = lazy(
  () => import("./views/desktop-banner/add-desktop-banner/AddDesktopBanner.jsx"),
);
const ManageRelatedBanner = lazy(
  () => import("./views/related-banner/manage-related-banner/ManageRelatedBanner.jsx"),
);
const AddRelatedBanner = lazy(
  () => import("./views/related-banner/add-related-banner/AddRelatedBanner.jsx"),
);

//bottom banner routes
const AddBottomBanner = lazy(
  () => import("./views/bottom-banner/add-bottom-banner/AddBottomBanner.jsx"),
);
const ManageBottomBanner = lazy(
  () => import("./views/bottom-banner/manage-bottom-banner/ManageBottomBanner.jsx"),
);

//top banner routes
const AddTopBanner = lazy(() => import("./views/top-banner/add-top-banner/AddSideBanner.jsx"));
const ManageTopBanner = lazy(
  () => import("./views/top-banner/manage-top-banner/ManageTopBanner.jsx"),
);

// manufacturer routes
const ManageManufacturers = lazy(
  () => import("./views/manufacturer/manage-manufacturer/ManageManufacturer"),
);
const AddManufacturer = lazy(() => import("./views/manufacturer/add-manufacturer/AddManufacturer"));
const ManageCustomers = lazy(() => import("./views/customers/manage-customers/ManageCustomers"));
const AddCustomer = lazy(() => import("./views/customers/add-customer/AddCustomer"));

// order routes
const ViewOrderDetails = lazy(() => import("./views/orders/manage-orders/ViewOrderDetails.jsx"));
const AddOrder = lazy(() => import("./views/orders/add-order/AddOrder"));
const ManageOrders = lazy(() => import("./views/orders/manage-orders/ManageOrders"));

const OrderReport = lazy(() => import("./views/orderReports/ManageOrderReports"));

// offer routes
const CreateOffer = lazy(() => import("./views/offer/create-offer/index.jsx"));
const ShowAllOffer = lazy(() => import("./views/offer/ShoAllOffer"));

// all comments / reviews routes
const AllReviews = lazy(() => import("./views/all-reviews/AllReviews.jsx"));
const AllNewsletter = lazy(() => import("./views/all-newsletter-subscriber/AllNewsLetter"));

const AddAdmin = lazy(() => import("./views/admins/add-admin/AddAdmin"));
const ManageAdmins = lazy(() => import("./views/admins/manage-admins/ManageAdmins"));
const AddFooter = lazy(() => import("./views/admins/footer/AddFooter"));
const AddRules = lazy(() => import("./views/admins/rules/add-rules/AddRules"));

const Colors = lazy(() => import("./views/theme/colors/Colors"));
const Typography = lazy(() => import("./views/theme/typography/Typography"));

// Buttons
const Buttons = lazy(() => import("./views/buttons/buttons/Buttons"));
const ButtonGroups = lazy(() => import("./views/buttons/button-groups/ButtonGroups"));
const Dropdowns = lazy(() => import("./views/buttons/dropdowns/Dropdowns"));

//Forms
const ChecksRadios = lazy(() => import("./views/forms/checks-radios/ChecksRadios"));
const FloatingLabels = lazy(() => import("./views/forms/floating-labels/FloatingLabels"));
const FormControl = lazy(() => import("./views/forms/form-control/FormControl"));
const InputGroup = lazy(() => import("./views/forms/input-group/InputGroup"));
const Layout = lazy(() => import("./views/forms/layout/Layout"));
const Range = lazy(() => import("./views/forms/range/Range"));
const Select = lazy(() => import("./views/forms/select/Select"));
const Validation = lazy(() => import("./views/forms/validation/Validation"));

const Charts = lazy(() => import("./views/charts/Charts"));

// Icons
const CoreUIIcons = lazy(() => import("./views/icons/coreui-icons/CoreUIIcons"));
const Flags = lazy(() => import("./views/icons/flags/Flags"));
const Brands = lazy(() => import("./views/icons/brands/Brands"));

// Notifications
const Alerts = lazy(() => import("./views/notifications/alerts/Alerts"));
const Badges = lazy(() => import("./views/notifications/badges/Badges"));
const Modals = lazy(() => import("./views/notifications/modals/Modals"));
const Toasts = lazy(() => import("./views/notifications/toasts/Toasts"));

const Widgets = lazy(() => import("./views/widgets/Widgets"));
const VendorPage = lazy(() => import("./views/vendor/index/VendorPage"));
const OrderOverviewPage = lazy(() => import("./views/orders/order-overview/index"));

const routes = [
  { isAdmin: false, path: "/product", name: "Products", element: ManageProducts, exact: false },
  { isAdmin: false, path: "/product/manage", name: "Manage Products", element: ManageProducts },
  { isAdmin: false, path: "/product/add", name: "Add Product", element: AddProduct },
  { isAdmin: false, path: "/product/edit/:id", name: "Edit Product", element: AddProduct },

  //category routes
  {
    isAdmin: false,
    path: "/category",
    name: "Categories",
    element: ManageCategories,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/category/manage",
    name: "Manage categories",
    element: ManageCategories,
  },
  { isAdmin: false, path: "/category/add", name: "Add Category", element: AddCategory },
  { isAdmin: false, path: "/category/edit/:id", name: "Edit Category", element: AddCategory },

  //subcategory routes
  {
    isAdmin: false,
    path: "/subcategory",
    name: "subcategories",
    element: ManageSubcategories,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/subcategory/manage",
    name: "Manage subcategories",
    element: ManageSubcategories,
  },
  {
    isAdmin: false,
    path: "/subcategory/add",
    name: "Add subcategory",
    element: AddSubcategory,
  },
  {
    isAdmin: false,
    path: "/subcategory/edit/:id",
    name: "Edit subcategory",
    element: AddSubcategory,
  },

  //subcategory children routes
  {
    isAdmin: false,
    path: "/subcategory-children",
    name: "Subcategory children",
    element: ManageSubcategoriesChildren,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/subcategory-children/manage",
    name: "Manage subcategoy children",
    element: ManageSubcategoriesChildren,
  },
  {
    isAdmin: false,
    path: "/subcategory-children/add",
    name: "Add subcategory children",
    element: AddSubcategoryChildren,
  },
  {
    isAdmin: false,
    path: "/subcategory-children/edit/:id",
    name: "Edit subcategory children",
    element: AddSubcategoryChildren,
  },

  // manufacturer routes
  {
    isAdmin: false,
    path: "/manufacturer",
    name: "Brands",
    element: ManageManufacturers,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/manufacturer/manage",
    name: "Manage brands",
    element: ManageManufacturers,
  },
  {
    isAdmin: false,
    path: "/manufacturer/add",
    name: "Add brand",
    element: AddManufacturer,
  },
  {
    isAdmin: false,
    path: "/manufacturer/edit/:id",
    name: "Edit brand",
    element: AddManufacturer,
  },

  {
    isAdmin: false,
    path: "/coupon",
    name: "Coupons",
    element: ManageCoupons,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/coupon/manage",
    name: "Manage Coupons",
    element: ManageCoupons,
  },
  {
    isAdmin: true,
    path: "/coupon/add",
    name: "Add coupon",
    element: AddCoupons,
  },
  {
    isAdmin: true,
    path: "/coupon/edit/:id",
    name: "Edit coupon",
    element: AddCoupons,
  },

  {
    isAdmin: false,
    path: "/order",
    name: "Orders",
    element: ManageOrders,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/order/manage",
    name: "Manage orders",
    element: ManageOrders,
  },
  {
    isAdmin: false,
    path: "/order/add",
    name: "Add order",
    element: AddOrder,
  },
  {
    isAdmin: false,
    path: "/order/edit/:id",
    name: "Edit order",
    element: AddOrder,
  },
  {
    isAdmin: false,
    path: "/order/details/:id",
    name: "Order details",
    element: ViewOrderDetails,
  },

  //order overview
  {
    isAdmin: false,
    path: "/order-overview",
    name: "Order Overview",
    element: OrderOverviewPage,
  },

  // report routes
  {
    isAdmin: false,
    path: "/report",
    name: "All reports",
    element: OrderReport,
  },

  //customer routes
  {
    isAdmin: false,
    path: "/customer",
    name: "Customers",
    element: ManageCustomers,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/customer/manage",
    name: "Manage customers",
    element: ManageCustomers,
  },
  {
    isAdmin: false,
    path: "/customer/add",
    name: "Add customer",
    element: AddCustomer,
  },
  {
    isAdmin: false,
    path: "/customer/edit/:id",
    name: "Edit customer",
    element: AddCustomer,
  },

  {
    isAdmin: false,
    path: "/customer-group",
    name: "Customers group",
    element: ManageCustomerGroup,
    exact: false,
  },
  {
    isAdmin: false,
    path: "/customer-group/manage",
    name: "Manage customer group",
    element: ManageCustomerGroup,
  },
  {
    isAdmin: false,
    path: "/customer-group/add",
    name: "Add customer group",
    element: AddCustomerGroup,
  },
  {
    isAdmin: false,
    path: "/customer-group/edit/:id",
    name: "Edit customer group",
    element: AddCustomerGroup,
  },

  // customer route end

  // offer route start
  {
    isAdmin: false,
    path: "/create-offer",
    name: "Create offer",
    element: CreateOffer,
  },
  {
    isAdmin: false,
    path: "/create-offer/edit/:id",
    name: "Create offer",
    element: CreateOffer,
  },
  {
    isAdmin: false,
    path: "/see-all-offer",
    name: "Create offer",
    element: ShowAllOffer,
  },
  // offer route end

  // reports and sales route start
  {
    isAdmin: false,
    path: "/sales/product",
    name: "Sales by product",
    element: ManageSalesByProduct,
  },
  {
    isAdmin: false,
    path: "/sales/category",
    name: "Sales by category",
    element: ManageSalesByCategory,
  },
  {
    isAdmin: false,
    path: "/sales/customer",
    name: "Sales by customer",
    element: ManageSalesCustomer,
  },
  {
    isAdmin: false,
    path: "/shipping/manage",
    name: "Sales by customer",
    element: ManageShipping,
  },

  {
    isAdmin: true,
    path: "/shipping/edit/:id",
    name: "Update shipping charge",
    element: EditShipping,
  },
  {
    isAdmin: true,
    path: "/shipping/add",
    name: "Update shipping charge",
    element: EditShipping,
  },

  //admin route

  {
    isAdmin: true,
    path: "/admin",
    name: "Admins",
    element: ManageAdmins,
    exact: false,
  },
  {
    isAdmin: true,
    path: "/admin/manage",
    name: "Manage admins",
    element: ManageAdmins,
  },
  {
    isAdmin: true,
    path: "/admin/add",
    name: "Add admin",
    element: AddAdmin,
  },
  {
    isAdmin: true,
    path: "/admin/edit/:id",
    name: "Edit admin",
    element: AddAdmin,
  },
  {
    isAdmin: false,
    path: "/footer/add",
    name: "Add admin",
    element: AddFooter,
  },
  {
    isAdmin: false,
    path: "/footer/edit/:id",
    name: "Edit admin",
    element: AddFooter,
  },
  {
    isAdmin: false,
    path: "/rules/add",
    name: "Add Rules",
    element: AddRules,
  },
  {
    isAdmin: false,
    path: "/rules/edit/:id",
    name: "Edit rules",
    element: AddRules,
  },

  // {
  //   isAdmin: false,
  //   path: "/mail",
  //   name: "Mail",
  //   element: Mail,
  //   exact: false,
  // },

  {
    isAdmin: true,
    path: "/settings",
    name: "Settings",
    element: Settings,
    exact: true,
  },
  // banner images route start
  {
    isAdmin: false,
    path: "/desktop-banner",
    name: "All desktop banner",
    element: ManageDesktopBanner,
  },
  {
    isAdmin: false,
    path: "/desktop-banner/add",
    name: "Add desktop banner",
    element: AddDesktopBanner,
  },
  {
    isAdmin: false,
    path: "/desktop-banner/edit/:id",
    name: "Add desktop banner",
    element: AddDesktopBanner,
  },

  // mobile banner routes
  {
    isAdmin: false,
    path: "/related-banner",
    name: "All related banner",
    element: ManageRelatedBanner,
  },
  {
    isAdmin: false,
    path: "/related-banner/add",
    name: "Add related banner",
    element: AddRelatedBanner,
  },
  {
    isAdmin: false,
    path: "/related-banner/edit/:id",
    name: "Add related banner",
    element: AddRelatedBanner,
  },
  // top banner routes
  {
    isAdmin: false,
    path: "/side-banner",
    name: "All side banner",
    element: ManageTopBanner,
  },

  {
    isAdmin: false,
    path: "/side-banner/add",
    name: "Add side banner",
    element: AddTopBanner,
  },
  {
    isAdmin: false,
    path: "/side-banner/edit/:id",
    name: "Add side banner",
    element: AddTopBanner,
  },
  //bottom banner routes
  {
    isAdmin: false,
    path: "/bottom-banner",
    name: "All bottom banner",
    element: ManageBottomBanner,
  },
  {
    isAdmin: false,
    path: "/bottom-banner/add",
    name: "Add bottom banner",
    element: AddBottomBanner,
  },
  {
    isAdmin: false,
    path: "/bottom-banner/edit/:id",
    name: "Add bottom banner",
    element: AddBottomBanner,
  },
  // banner images route end

  // reviews route
  {
    isAdmin: false,
    path: "/all-reviews",
    name: "Reviews",
    element: AllReviews,
  },
  // news letter route
  {
    isAdmin: false,
    path: "/all-newsletter",
    name: "Reviews",
    element: AllNewsletter,
  },

  // pages routes start
  {
    isAdmin: false,
    path: "/pages/blog",
    name: "Blogs",
    element: AllBlogs,
  },
  {
    isAdmin: false,
    path: "/pages/blog/edit/:id",
    name: "Blogs",
    element: AddBlog,
  },
  {
    isAdmin: false,
    path: "/pages/blog/add",
    name: "Blogs",
    element: AddBlog,
  },
  //
  {
    isAdmin: false,
    path: "/pages/terms",
    name: "All terms & condition",
    element: TermConditions,
  },
  {
    isAdmin: false,
    path: "/pages/terms/edit/:id",
    name: "Terms & condition edit",
    element: AddTermConditions,
  },
  {
    isAdmin: false,
    path: "/pages/terms/add",
    name: "Terms & condition add",
    element: AddTermConditions,
  },
  //
  {
    isAdmin: false,
    path: "/pages/privacy-policy",
    name: "All Terms & Condition",
    element: AllPrivacy,
  },
  {
    isAdmin: false,
    path: "/pages/privacy-policy/edit/:id",
    name: "Terms & condition edit",
    element: AddPrivacy,
  },
  {
    isAdmin: false,
    path: "/pages/privacy-policy/add",
    name: "Terms & condition add",
    element: AddPrivacy,
  },

  //

  {
    isAdmin: false,
    path: "/pages/return",
    name: "Return",
    element: AllReturns,
  },
  {
    isAdmin: false,
    path: "/pages/return/edit/:id",
    name: "Update return policy",
    element: AddReturn,
  },
  {
    isAdmin: false,
    path: "/pages/return/add",
    name: "Add return policy",
    element: AddReturn,
  },

  //

  {
    isAdmin: false,
    path: "/pages/store-location",
    name: "Store location",
    element: AllStoreLocation,
  },
  {
    isAdmin: false,
    path: "/pages/store-location/edit/:id",
    name: "Update store location",
    element: AddStoreLocation,
  },
  {
    isAdmin: false,
    path: "/pages/store-location/add",
    name: "Add store location",
    element: AddStoreLocation,
  },

  //

  {
    isAdmin: false,
    path: "/pages/delivery-info",
    name: "Store location",
    element: AllDeliveryInfo,
  },
  {
    isAdmin: false,
    path: "/pages/delivery-info/edit/:id",
    name: "Update delivery info",
    element: AddDeliveryInfo,
  },
  {
    isAdmin: false,
    path: "/pages/delivery-info/add",
    name: "Add delivery info",
    element: AddDeliveryInfo,
  },
  //

  {
    isAdmin: false,
    path: "/pages/faq",
    name: "All Faq",
    element: ManageFaq,
  },
  {
    isAdmin: false,
    path: "/pages/faq/edit/:id",
    name: "Update faq info",
    element: AddFaq,
  },
  {
    isAdmin: false,
    path: "/pages/faq/add",
    name: "Add faq",
    element: AddFaq,
  },

  //
  //

  {
    isAdmin: false,
    path: "/pages/faq/add",
    name: "Add faq",
    element: AddFaq,
  },

  //

  // pages routes end

  { isAdmin: false, path: "/", exact: false, name: "Home" },
  { isAdmin: false, path: "/dashboard", exact: false, name: "Dashboard", element: Dashboard },

  // variants route

  {
    isAdmin: false,
    path: "/size",
    name: "All size",
    element: AllSize,
  },
  {
    isAdmin: false,
    path: "/size/add",
    name: "Add size",
    element: AddSize,
  },
  {
    isAdmin: false,
    path: "/size/edit/:id",
    name: "Update size",
    element: AddSize,
  },

  {
    isAdmin: false,
    path: "/color",
    name: "All color",
    element: AllColor,
  },
  {
    isAdmin: false,
    path: "/color/add",
    name: "Add color",
    element: AddColor,
  },
  {
    isAdmin: false,
    path: "/color/edit/:id",
    name: "Update color",
    element: AddColor,
  },

  // flashSale routes
  {
    isAdmin: false,
    path: "/flashSale-types",
    name: "All flash sale types",
    element: ManageFlashSaleTypes,
  },
  {
    isAdmin: false,
    path: "/flashSale-types/add",
    name: "Add flash sale types",
    element: AddFlashSaleTypes,
  },
  {
    isAdmin: false,
    path: "/flashSale-types/edit/:id",
    name: "Update flash sale types",
    element: AddFlashSaleTypes,
  },
  // flashSale  products routes
  {
    isAdmin: false,
    path: "/flashSale",
    name: "All flash sale product",
    element: ManageFlashSaleProduct,
  },
  {
    isAdmin: false,
    path: "/flashSale-product/add",
    name: "Add flash sale product",
    element: AddFlashSaleProduct,
  },
  {
    isAdmin: false,
    path: "/flashSale-product/edit/:id",
    name: "Update flash sale product",
    element: AddFlashSaleProduct,
  },
  // flashSale  offer routes
  {
    isAdmin: false,
    path: "/show-flashSale",
    name: "All flash sale offers",
    element: ManageFlashSaleOffer,
  },
  {
    isAdmin: false,
    path: "/flashSale-offer/add",
    name: "Add flash sale offers",
    element: AddFlashSaleOffer,
  },
  {
    isAdmin: false,
    path: "/flashSale-offer/edit/:id",
    name: "Update flash sale offers",
    element: AddFlashSaleOffer,
  },


  // vendor routes 

  {
    isAdmin: false,
    path: "/vendor",
    name: "Vendor",
    element: VendorPage,
  },

];

export default routes;
