import { cilSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CButtonGroup, CCard, CCardBody, CCol, CForm, CRow } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useGetAllUsersQuery } from "src/redux/users/usersApi";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function getDaysArray(month) {
  let numDaysInMonth, i, j, daysArray;
  numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  daysArray = [];
  for (i = 0, j = numDaysInMonth[month - 1]; i < j; i++) {
    daysArray.push(i + 1);
  }

  return daysArray;
}
function getYearsArray(currentYear) {
  const startYear = 2015;
  const difference = currentYear - startYear + 1;
  let years = [];
  for (let i = 0; i < difference; i++) {
    years.push(startYear + i);
  }
  return years;
}

const ManageSalesCustomer = () => {
  const [selectValue, setSelectValue] = useState("Month");
  const [selectedLabel, setSelectedLabel] = useState(months);
  const monthData = [40, 20, 12, 39, 90, 40, 39, 40, 40, 39, 80, 50];
  const [selectedData, setSelectedData] = useState(monthData);
  const { register, handleSubmit, control } = useForm();

  const { data: allUsers, isLoading: userLoading, isError: userError } = useGetAllUsersQuery();

  const yearData = [40, 20, 12, 39, 10, 40, 39, 80, 40, 39, 80, 40];
  const dayData = [
    40, 20, 12, 39, 10, 40, 39, 80, 20, 39, 80, 40, 40, 50, 12, 39, 20, 40, 39, 80, 40, 39, 80, 40,
    40, 20, 12, 39, 10, 40, 39,
  ];

  const handleButtonValueChanges = (value) => {
    setSelectValue(value);

    if (value === "Day") {
      setSelectedLabel(getDaysArray(new Date().getMonth()));
      setSelectedData(dayData);
    }
    if (value === "Month") {
      setSelectedLabel(months);
      setSelectedData(monthData);
    }
    if (value === "Year") {
      setSelectedLabel(getYearsArray(new Date().getFullYear()));
      setSelectedData(yearData);
    }
  };

  const options = allUsers?.result?.map((user) => {
    return { value: user?._id, label: user?.email };
  });

  const handleSearchProduct = (data) => {
  };

  return (
    <div>
      <Row>
        <Col>
          <CCard className="mb-4">
            <div
              className="mx-3 px-3 mt-3 py-3 border rounded"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <CForm onSubmit={handleSubmit(handleSearchProduct)}>
                <CCol xs={4}>
                  <p className="mb-0">Customer Email</p>
                  <Controller
                    control={control}
                    name={"product"}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        className="mt-2"
                        placeholder={<div>Type user email</div>}
                        inputRef={ref}
                        options={options}
                        value={options?.find((option) => option.value === value)}
                        onChange={(val) => onChange(val?.map((opt) => opt.value))}
                        isMulti
                      />
                    )}
                  />
                </CCol>
                <div className="d-flex align-items-center justify-content-end mt-3 ">
                  <CButton color="info" className=" text-white" type="submit">
                    <CIcon icon={cilSearch} style={{ width: "12px", height: "12px" }} /> Filter
                  </CButton>
                </div>
              </CForm>
            </div>
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Sales By Customer
                  </h4>
                  <div className="small text-medium-emphasis">{new Date().toDateString()}</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    {["Day", "Month", "Year"].map((value) => (
                      <CButton
                        color="outline-info"
                        key={value}
                        onClick={() => handleButtonValueChanges(value)}
                        className="mx-0 shadow-none"
                        active={value === selectValue}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: selectedLabel,
                  datasets: [
                    {
                      label: "Sales By Product",
                      backgroundColor: "#FF6384",
                      data: selectedData,
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
            {/* <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {progressExample.map((item, index) => (
              <CCol className="mb-sm-2 mb-0" key={index}>
                <div className="text-medium-emphasis">{item.title}</div>
                <strong>
                  {item.value} ({item.percent}%)
                </strong>
                <CProgress
                  thin
                  className="mt-2"
                  color={item.color}
                  value={item.percent}
                />
              </CCol>
            ))}
          </CRow>
        </CCardFooter> */}
          </CCard>
        </Col>
      </Row>
    </div>
  );
};

export default ManageSalesCustomer;
