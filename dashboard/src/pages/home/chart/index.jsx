import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";

import OrderCard from "@/components/Widgets/OrderCard";
import { analyst } from "../../../redux/slices/orders";
import { formatCurrency } from "../../../utils/formatCurrency";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";

const DashAnalytics = () => {
  const dispatch = useDispatch();
  const { analyst: analyticsData } = useSelector((state) => state.orders);

  const [currentMonthRevenue, setCurrentMonthRevenue] = useState(0);
  const [chartType, setChartType] = useState("daily");
  const [data, setData] = useState(analyticsData.bestSelling);
  // Fetch dữ liệu khi component được mount
  useEffect(() => {
    dispatch(analyst());
  }, [dispatch]);

  // Tính doanh thu của tháng hiện tại
  useEffect(() => {
    const currentMonth = new Date().getMonth() + 1;
    const revenue =
      analyticsData?.monthlyRevenue?.find((item) => item.month === currentMonth)
        ?.revenue || 0;
    setCurrentMonthRevenue(revenue);
  }, [analyticsData]);

  // Xử lý dữ liệu biểu đồ
  let chartData = [];
  if (chartType === "daily") {
    chartData =
      analyticsData?.dailyRevenue?.map((item) => ({
        label: item.date,
        total: item.revenue.total || 0,
        count: item.revenue.count || 0,
      })) || [];
  } else if (chartType === "monthly") {
    chartData =
      analyticsData?.monthlyRevenue?.map((item) => ({
        label: `Tháng ${item.month}`,
        total: item.revenue || 0,
        count: (item.revenue / 1000000).toFixed(2), // Giả sử count từ doanh thu
      })) || [];
  } else if (chartType === "yearly") {
    chartData =
      analyticsData?.annualRevenue?.map((item) => ({
        label: `Năm ${item.year}`,
        total: item.revenue || 0,
        count: (item.revenue / 1000000).toFixed(2), // Giả sử count từ doanh thu
      })) || [];
  }

  const labels = chartData.map((item) => item.label);
  const revenueDataTotal = chartData.map((item) => item.total);
  const revenueData = chartData.map((item) => item.count);

  // Cấu hình dữ liệu cho biểu đồ
  const updatedChartData = {
    height: 350,
    type: "line",
    options: {
      chart: {
        toolbar: { show: false },
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
        formatter: (value, { seriesIndex }) => {
          // Kiểm tra loại series: 0 là doanh thu, 1 là số đơn hàng
          return seriesIndex === 0
            ? new Intl.NumberFormat("vi-VN").format(value) + " đ" // Format tiền tệ
            : value.toLocaleString(); // Hiển thị số đơn hàng
        },
        style: {
          fontSize: "12px",
          colors: ["#73b4ff"], // Màu chữ
        },
      },
      labels, // Nhãn cho biểu đồ
      yaxis: [
        {
          title: { text: "Doanh thu" },
          labels: {
            formatter: (value) => new Intl.NumberFormat("vi-VN").format(value), // Doanh thu
          },
        },
        {
          opposite: true,
          title: { text: "Số đơn hàng" },
          labels: {
            formatter: (value) => value.toLocaleString(), // Số đơn hàng
          },
        },
      ],
      colors: ["#73b4ff", "#59e0c5"],
    },
    series: [
      {
        name: "Doanh thu",
        type: "column",
        data: revenueDataTotal, // Dữ liệu doanh thu
      },
      {
        name: "Số đơn hàng",
        type: "line",
        data: revenueData, // Dữ liệu số đơn hàng
      },
    ],
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  const columns = [
    // { field: "_id", headerName: "Mã đơn hàng", width: 200, hide: true },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 450,
      renderCell: (params) => {
        return (
          <div className="d-flex align-items-center">
            <Avatar
              src={params.row.thumbnail}
              alt={params.row.name}
              sx={{ width: 50, height: 50 }}
              variant="square"
            />
            <span className="ms-2">{params.row.name}</span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá bán",
      width: 150,
      renderCell: (params) => {
        return formatCurrency(params.row.price);
      },
    },
    { field: "hasSold", headerName: "Đã bán", width: 100 },
    { field: "inventory", headerName: "Tồn kho", width: 100 },
    { field: "onStock", headerName: "Có sẵn", width: 100 },
    { field: "view", headerName: "Lượt xem", width: 120 },
  ];

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
              title: "Tổng đơn hàng",
              class: "bg-c-yellow",
              icon: "feather icon-tag",
              primaryText: analyticsData?.totalOrder || 0,
              secondaryText: "Tổng",
              extraText: analyticsData?.totalOrder || 0,
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

      <Row>
        <Col md={12} xl={12}>
          <Card>
            <div className="fs-4 p-4">
              <h5>Thống kê doanh thu</h5>
            </div>
            <div className="px-4">
              <div className="mb-3">
                <button
                  className={`btn btn-sm me-2 ${
                    chartType === "daily"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleChartTypeChange("daily")}
                >
                  Ngày
                </button>
                <button
                  className={`btn btn-sm  me-2 ${
                    chartType === "monthly"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleChartTypeChange("monthly")}
                >
                  Tháng
                </button>
                <button
                  className={`btn btn-sm  me-2 ${
                    chartType === "yearly"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => handleChartTypeChange("yearly")}
                >
                  Năm
                </button>
              </div>
              <Chart {...updatedChartData} />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={12}>
          <Card className="p-4">
            <h5 className="mb-4">Sản phẩm bán chạy</h5>
            <DataGrid
              rows={data}
              columns={columns}
              loading={status === "loading"}
              getRowId={(row) => row._id}
              localeText={{
                noRowsLabel: "Không có dữ liệu",
                MuiTablePagination: {
                  labelRowsPerPage: "Số dòng mỗi trang",
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              experimentalFeatures={{ newEditingApi: true }}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              disableRowSelectionOnClick
            />
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashAnalytics;
