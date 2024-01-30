import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddOrderForm from "src/components/orders/AddOrderForm";

const AddOrder = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/order/${id}`)
      .then((response) => setData(response.data.result[0]))
      .catch((error) => console.log(error));
  }, [id]);

  const handleCreateOrder = (data) => {
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/order/${id}`, data)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/order`, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };


  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{id ? "Edit" : "Add"} Order</strong>
            </CCardHeader>
            <CCardBody>
              <AddOrderForm data={data} onSubmit={handleCreateOrder} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddOrder;
