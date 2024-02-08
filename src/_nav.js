/* eslint-disable prettier/prettier */
import {
  cilBadge,
  cilBarChart,
  cilBarcode,
  cilCart,
  cilEnvelopeLetter,
  cilList,
  cilMoney,
  cilSettings,
  cilSpeedometer,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CNavGroup, CNavItem } from "@coreui/react";
import {
  BsBoxSeam,
  BsCartPlus,
  BsOctagonFill,
  BsParagraph,
  BsPatchCheck,
  BsPeople,
  BsPerson,
  BsReceipt,
} from "react-icons/bs";
import { RiCoupon3Line } from "react-icons/ri";
import { MdInsertComment, MdOutlineUnsubscribe, MdPages } from "react-icons/md";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    isAdmin: false,
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: "NEW",
    // },
  },
  {
    component: CNavGroup,
    name: "Products",
    isAdmin: false,

    icon: <BsBoxSeam className="nav-icon" />,
    items: [{ component: CNavItem, name: "All Products", to: "/product" }],
  },
  {
    component: CNavGroup,
    name: "FlashSale",
    isAdmin: false,

    icon: <CIcon icon={cilBarcode} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: "FlashSale Products", to: "/flashSale" },
      { component: CNavItem, name: "FlashSale Types", to: "/flashSale-types" },
      { component: CNavItem, name: "Show All Flash Offer", to: "/show-flashSale" },
    ],
  },
  {
    component: CNavGroup,
    name: "All Categories",
    isAdmin: false,
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Categories",
        to: "/category",
        // icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Subcategories",
        to: "/subcategory",
        // icon: <CIcon icon={cilSitemap} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Subcategory Children",
        to: "/subcategory-children",
        // icon: <RiNodeTree className="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: "All Variants",
    isAdmin: false,
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Sizes",
        to: "/size",
      },
      {
        component: CNavItem,
        name: "Colors",
        to: "/color",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Orders",
    isAdmin: false,
    icon: <BsCartPlus className="nav-icon" />,
    items: [{ component: CNavItem, name: "All Orders", to: "/order" }],
  },
  {
    component: CNavGroup,
    name: "Reports",
    isAdmin: false,
    icon: <BsReceipt className="nav-icon" />,
    items: [{ component: CNavItem, name: "All Reports", to: "/report" }],
  },
  {
    component: CNavGroup,
    name: "Brands",
    isAdmin: false,
    icon: <BsPatchCheck className="nav-icon" />,
    items: [{ component: CNavItem, name: "All Brands", to: "/manufacturer" }],
  },
  {
    component: CNavGroup,
    name: "Coupons",
    isAdmin: false,
    icon: <RiCoupon3Line className="nav-icon" />,
    items: [{ component: CNavItem, name: "All Coupons", to: "/coupon" }],
  },
  {
    component: CNavGroup,
    name: "Customers",
    isAdmin: false,
    icon: <BsPerson className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Customers",
        to: "/customer",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Customer Group",
    isAdmin: false,
    icon: <BsPeople className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Customer Group",
        to: "/customer-group",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "New Customer Offer",
    isAdmin: false,
    icon: <BsOctagonFill className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Create Offer",
        to: "/create-offer",
      },
      {
        component: CNavItem,
        name: "Show All Offer",
        to: "/see-all-offer",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Banner",
    isAdmin: false,
    icon: <BsParagraph className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Desktop banner",
        to: "/desktop-banner",
      },
      {
        component: CNavItem,
        name: "Related banner",
        to: "/related-banner",
      },
      {
        component: CNavItem,
        name: "Side banner",
        to: "/side-banner",
      },
      {
        component: CNavItem,
        name: "Bottom banner",
        to: "/bottom-banner",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Reviews",
    isAdmin: false,
    icon: <MdInsertComment className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Reviews",
        to: "/all-reviews",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "NewsLetter",
    isAdmin: false,
    icon: <MdOutlineUnsubscribe className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "All Subscribers",
        to: "/all-newsletter",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Pages",
    isAdmin: false,
    icon: <MdPages className="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Blogs",
        to: "/pages/blog",
      },
      {
        component: CNavItem,
        name: "Terms & Conditions",
        to: "/pages/terms",
      },
      {
        component: CNavItem,
        name: "FAQ",
        to: "/pages/faq",
      },
      // {
      //     component: CNavItem,
      //     name: "Customer Service",
      //     to: "/pages/customer-service",
      // },
      {
        component: CNavItem,
        name: "Privacy Policy",
        to: "/pages/privacy-policy",
      },
      // {
      //     component: CNavItem,
      //     name: "Affilate",
      //     to: "/pages/affilate",
      // },
      {
        component: CNavItem,
        name: "Store Location",
        to: "/pages/store-location",
      },
      {
        component: CNavItem,
        name: "Return",
        to: "/pages/return",
      },
      {
        component: CNavItem,
        name: "Delivery Info",
        to: "/pages/delivery-info",
      },
    ],
  },

  {
    component: CNavItem,
    name: "Shipping",
    isAdmin: false,
    to: "/shipping/manage",
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Vendor",
    to: "/vendor",
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Admins",
    isAdmin: true,
    to: "/admin",
    icon: <CIcon icon={cilBadge} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Settings",
    isAdmin: true,
    to: "/settings",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
];

export default _nav;
