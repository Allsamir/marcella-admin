import { CTableDataCell, CTableHeaderCell, CTableRow, to } from "@coreui/react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import DeleteButton from "../button/DeleteButton";
import EditButton from "../button/EditButton";
import DeleteModal from "../DeleteModal";

const BannerRowParent = ({ data, index, deleteBannerHook, deleteLoading, to }) => {
  const { image, _id, name } = data || {};
  const [showModal, setShowModal] = useState(false);
  return (
    <CTableRow>
      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
      <CTableHeaderCell scope="row">{name}</CTableHeaderCell>
      <CTableDataCell>
        <Image
          src={image}
          alt="banner_image"
          height={200}
          style={{ width: "100%", objectFit: "contain" }}
        />
      </CTableDataCell>
      <CTableDataCell>
        <div className="">
          <Link to={`/${to}/edit/${_id}`}>
            <EditButton />
          </Link>
          <DeleteButton setShowModal={setShowModal} />
        </div>
      </CTableDataCell>
      <DeleteModal
        deleteThis={deleteBannerHook}
        showModal={showModal}
        setShowModal={setShowModal}
        id={_id}
        deleteLoading={deleteLoading}
      />
    </CTableRow>
  );
};

export default BannerRowParent;
