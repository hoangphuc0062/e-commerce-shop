import React, { useEffect, useState } from "react";

import { Row, Col, Card } from "react-bootstrap";

import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

import OrderCard from "@/components/Widgets/OrderCard";

import { analyst } from "../../../redux/slices/orders";
import { formatCurrency } from "../../../utils/formatCurrency";

const DashAnalytics = () => {
  const dispatch = useDispatch();

  const { analyst: analyticsData } = useSelector((state) => state.orders);

  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);

  useEffect(() => {
    dispatch(analyst());
  }, [dispatch]);

  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const revenue =
      analyticsData?.monthlyRevenue?.find((item) => item.month === currentMonth)
        ?.revenue || 0;
    setCurrentMonthRevenue(revenue);
  }, [analyticsData]);
  const labels = analyticsData?.dailyRevenue?.map((item) => item.date);

  const revenueData = analyticsData?.dailyRevenue?.map(
    (item) => item.revenue.count
  );
  const revenueDataTotal = analyticsData?.dailyRevenue?.map(
    (item) => item.revenue.total
  );

  const comboChartData = {
    height: 350,
    type: "line",
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 4],
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels,
      yaxis: [
        {
          title: {
            text: "Doanh thu",
          },
        },
        {
          opposite: true,
          title: {
            text: "Số đơn hàng",
          },
        },
      ],
      colors: ["#73b4ff", "#59e0c5"],
    },
    series: [
      {
        name: "Doanh thu",
        type: "column",
        data: revenueDataTotal,
      },
      {
        name: "Số đơn hàng",
        type: "line",
        data: revenueData,
      },
    ],
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6} xl={4}>
          <OrderCard
            params={{
              title: "Tổng doanh thu",
              class: "bg-c-green",
              icon: "feather icon-tag",
              primaryText: formatCurrency(analyticsData?.totalRevenue),
              secondaryText: "Tháng này",
              extraText: formatCurrency(currentMonthRevenue),
            }}
          />
        </Col>
        <Col md={6} xl={4}>
          <OrderCard
            params={{
              title: "Doanh thu",
              class: "bg-c-yellow",
              icon: "feather icon-repeat",
              primaryText: formatCurrency(currentMonthRevenue),
              secondaryText: "Tháng này",
              extraText: formatCurrency(currentMonthRevenue),
            }}
          />
        </Col>
        <Col md={6} xl={4}>
          <OrderCard
            params={{
              title: "Số Người dùng",
              class: "bg-c-red",
              icon: "feather icon-user",
              primaryText: analyticsData?.countUser,
              secondaryText: "Tổng số",
              extraText: analyticsData?.countUser,
            }}
          />
        </Col>
      </Row>
      <Col md={12} xl={12}>
        <Card>
          <Card.Header>
            <h5>Khách truy cập duy nhất</h5>
          </Card.Header>
          <Card.Body className="ps-4 pt-4 pb-0">
            <Chart {...comboChartData} />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default DashAnalytics;
