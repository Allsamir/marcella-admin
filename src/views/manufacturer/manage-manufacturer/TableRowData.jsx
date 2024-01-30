import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "src/ui/button/DeleteButton";
import EditButton from "src/ui/button/EditButton";
import DeleteModal from "src/ui/DeleteModal";

const TableRowData = ({ index, manufacturer, handleDeleteManufacturer, deleteLoading }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <DeleteModal
        deleteThis={handleDeleteManufacturer}
        showModal={showModal}
        setShowModal={setShowModal}
        id={manufacturer?._id}
        deleteLoading={deleteLoading}
      />
      <CTableRow>
        <CTableHeaderCell scope="row">
          {index + 1}
          {/* <Form.Check inline type="checkbox" id={index + 1} /> */}
        </CTableHeaderCell>
        <CTableDataCell>{manufacturer?.name}</CTableDataCell>
        <CTableDataCell>
          <div className="">
            <Link to={`/manufacturer/edit/${manufacturer?._id}`}>
              <EditButton />
            </Link>
            <DeleteButton setShowModal={setShowModal} />
          </div>
        </CTableDataCell>
      </CTableRow>
    </>
  );
};

export default TableRowData;
