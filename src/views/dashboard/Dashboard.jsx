/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  useGetTotalSaleByYearQuery,
  useGetTotalSaleByMonthQuery,
  useGetTotalSaleByDayQuery,
  useGetTotalOrderByDayQuery,
  useGetTotalOrderByMonthQuery,
  useGetTotalOrdersByYearQuery,
} from "src/redux/order/orderApi";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { memo } from "react";
import {
  findDaysData,
  findMonthsData,
  getDaysArray,
  monthsLabel,
} from "src/utils/chartDataGenerator";
import OrderHeading from "./OrderHeading";
import LowQuantityProductHeading from "./LowQuantityProductHeading";
import ChartData from "./ChartData";
import { useEffect } from "react";

const Dashboard = () => {
  // year hooks
  const { data: totalYearSale } = useGetTotalSaleByYearQuery();
  const { data: totalYearOrders } = useGetTotalOrdersByYearQuery();

  //month hooks
  const { data: totalMonthSale } = useGetTotalSaleByMonthQuery();
  const { data: totalMonthOrder } = useGetTotalOrderByMonthQuery();

  //day hooks
  const { data: totalDaySale } = useGetTotalSaleByDayQuery(); // 1, 2, 3, 4, 5, 6, 7, 8....
  const { data: totalDayOrder } = useGetTotalOrderByDayQuery(); // 1, 2, 3, 4, 5, 6, 7, 8....

  //day
  const daysLabel = getDaysArray(new Date().getMonth() + 1);
  const daySalesData = findDaysData(daysLabel, totalDaySale);
  const dayOrderData = findDaysData(daysLabel, totalDayOrder);

  //year
  const yearLabel = totalYearSale?.map((data) => data?._id.year);
  const yearSalesData = totalYearSale?.map((data) => data.total);
  const yearOrdersData = totalYearOrders?.map((data) => data.total);

  //month
  const monthSalesData = findMonthsData(monthsLabel, totalMonthSale);
  const monthOrdersData = findMonthsData(monthsLabel, totalMonthOrder);

  const [selectValue, setSelectValue] = useState("Day");
  const [selectedLabel, setSelectedLabel] = useState(daysLabel); // initially day labels
  const [selectedSalesDayData, setSelectedSalesDayData] = useState("");
  const [selectedOrderDayData, setSelectedOrderDayData] = useState("");

  useEffect(() => {
    if (totalDaySale) {
      setSelectedSalesDayData(daySalesData);
      setSelectedOrderDayData(dayOrderData);
    }

    return () => { };
  }, [totalDaySale, totalDayOrder]);

  const handleButtonValueChanges = (value) => {
    setSelectValue(value);

    if (value === "Day") {
      setSelectedLabel(daysLabel);

      setSelectedSalesDayData(daySalesData);
      setSelectedOrderDayData(dayOrderData);
    }
    if (value === "Month") {
      setSelectedLabel(monthsLabel);

      setSelectedSalesDayData(monthSalesData);
      setSelectedOrderDayData(monthOrdersData);
    }
    if (value === "Year") {
      setSelectedLabel(yearLabel);

      setSelectedSalesDayData(yearSalesData);
      setSelectedOrderDayData(yearOrdersData);
    }
  };

  return (
    <>
      <WidgetsDropdown monthOrdersData={monthOrdersData} monthSalesData={monthSalesData} />
      <ChartData
        handleButtonValueChanges={handleButtonValueChanges}
        selectValue={selectValue}
        selectedLabel={selectedLabel}
        selectedSalesData={selectedSalesDayData}
        selectedOrderData={selectedOrderDayData}
      />
      <OrderHeading />
      <LowQuantityProductHeading />
    </>
  );
};

export default memo(Dashboard);
