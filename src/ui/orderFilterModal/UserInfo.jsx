import "./modal.scss";

const UserInfo = ({ filterData }) => {
  let numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const { totalOrders, totalSales, totalShipping } = filterData?.data?.[0] || {};
  const { name, email, phone } = filterData?.user || {};
  return (
    <div>
      <div className="d-flex justify-content-between my-4">
        <div className="salesCard userInfo">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
        <div className="salesCard sales">
          <p className="fs-5 fw-bold">{numberWithCommas(totalSales) || 0}</p>
          <p>Total sales</p>
        </div>
        <div className="salesCard shipping">
          <p className="fs-5 fw-bold">{numberWithCommas(totalShipping) || 0}</p>
          <p>Total shipping</p>
        </div>
        <div className="salesCard orders">
          <p className="fs-5 fw-bold">{numberWithCommas(totalOrders) || 0}</p>
          <p>Total orders</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
