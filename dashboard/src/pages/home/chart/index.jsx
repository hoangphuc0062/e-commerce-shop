import React from "react";

// react-bootstrap
import { Row, Col, Card, Table } from "react-bootstrap";

// third party
import Chart from "react-apexcharts";
import PerfectScrollbar from "react-perfect-scrollbar";

// project import
// import OrderCard from "../../components/Widgets/Statistic/OrderCard";
// import SocialCard from "../../components/Widgets/Statistic/SocialCard";
import uniqueVisitorChart from "./chart/analytics-unique-visitor-chart";
import customerChart from "./chart/analytics-cuatomer-chart";
import customerChart1 from "./chart/analytics-cuatomer-chart-1";

// assets
import OrderCard from "@/components/Widgets/OrderCard";
import SocialCard from "@/components/Widgets/SocialCard";

// ==============================|| DASHBOARD ANALYTICS ||============================== //

const DashAnalytics = () => {
  return (
    <React.Fragment>
      <Row>
        {/* order cards */}
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Đơn hàng đã nhận",
              class: "bg-c-blue",
              icon: "feather icon-shopping-cart",
              primaryText: "486",
              secondaryText: "Đơn hàng đã hoàn thành",
              extraText: "351",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng doanh thu",
              class: "bg-c-green",
              icon: "feather icon-tag",
              primaryText: "1641",
              secondaryText: "Tháng này",
              extraText: "213",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Doanh thu",
              class: "bg-c-yellow",
              icon: "feather icon-repeat",
              primaryText: "$42,562",
              secondaryText: "Tháng này",
              extraText: "$5,032",
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: "Tổng lợi nhuận",
              class: "bg-c-red",
              icon: "feather icon-award",
              primaryText: "$9,562",
              secondaryText: "Tháng này",
              extraText: "$542",
            }}
          />
        </Col>

        <Col md={12} xl={6}>
          <Card>
            <Card.Header>
              <h5>Khách truy cập duy nhất</h5>
            </Card.Header>
            <Card.Body className="ps-4 pt-4 pb-0">
              <Chart {...uniqueVisitorChart} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={6}>
          <Row>
            <Col sm={6}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Khách hàng</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0">826</h2>
                      <span className="text-c-green">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">Mới</span>
                    </Col>
                    <Col>
                      <h3 className="m-0">
                        <i className="fas fa-circle text-primary f-10 mx-2" />
                        182
                      </h3>
                      <span className="ms-3">Trở lại</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6}>
              <Card className="bg-primary text-white">
                <Card.Body>
                  <Row>
                    <Col sm="auto">
                      <span>Khách hàng</span>
                    </Col>
                    <Col className="text-end">
                      <h2 className="mb-0 text-white">826</h2>
                      <span className="text-white">
                        8.2%
                        <i className="feather icon-trending-up ms-1" />
                      </span>
                    </Col>
                  </Row>
                  <Chart {...customerChart1} />
                  <Row className="mt-3 text-center">
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-success" />
                        674
                      </h3>
                      <span className="ms-3">Mới</span>
                    </Col>
                    <Col>
                      <h3 className="m-0 text-white">
                        <i className="fas fa-circle f-10 mx-2 text-white" />
                        182
                      </h3>
                      <span className="ms-3">Trở lại</span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Giám sát chiến dịch</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-card" style={{ height: "362px" }}>
                <PerfectScrollbar>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <span>Ngày chiến dịch</span>
                        </th>
                        <th>
                          <span>nhấp chuột</span>
                        </th>
                        <th>
                          <span>Trị giá</span>
                        </th>
                        <th>
                          <span>Tỉ lệ chuyển đổi</span>
                        </th>
                        <th>
                          <span>Tổng danh thu</span>
                        </th>
                        <th>
                          <span>ECPI</span>
                        </th>
                        <th>
                          <span>Tri phí đầu tư</span>
                        </th>
                        <th>
                          <span>Doanh thu</span>
                        </th>
                        <th>
                          <span>Chuyển đổi</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>08-11-2016</td>
                        <td>786</td>
                        <td>485</td>
                        <td>769</td>
                        <td>45,3%</td>
                        <td>6,7%</td>
                        <td>8,56</td>
                        <td>10:55</td>
                        <td>33.8%</td>
                      </tr>
                      <tr>
                        <td>15-10-2016</td>
                        <td>786</td>
                        <td>523</td>
                        <td>736</td>
                        <td>78,3%</td>
                        <td>6,6%</td>
                        <td>7,56</td>
                        <td>4:30</td>
                        <td>76.8%</td>
                      </tr>
                      <tr>
                        <td>08-08-2017</td>
                        <td>624</td>
                        <td>436</td>
                        <td>756</td>
                        <td>78,3%</td>
                        <td>6,4%</td>
                        <td>9,45</td>
                        <td>9:05</td>
                        <td>8.63%</td>
                      </tr>
                      <tr>
                        <td>11-12-2017</td>
                        <td>423</td>
                        <td>123</td>
                        <td>756</td>
                        <td>78,6%</td>
                        <td>45,6%</td>
                        <td>6,85</td>
                        <td>7:45</td>
                        <td>33.8%</td>
                      </tr>
                      <tr>
                        <td>05-06-2015</td>
                        <td>465</td>
                        <td>463</td>
                        <td>456</td>
                        <td>68,6%</td>
                        <td>76,6%</td>
                        <td>7,56</td>
                        <td>8:45</td>
                        <td>39.8%</td>
                      </tr>
                      <tr>
                        <td>08-11-2016</td>
                        <td>786</td>
                        <td>485</td>
                        <td>769</td>
                        <td>45,3%</td>
                        <td>6,7%</td>
                        <td>8,56</td>
                        <td>10:55</td>
                        <td>33.8%</td>
                      </tr>
                      <tr>
                        <td>15-10-2016</td>
                        <td>786</td>
                        <td>523</td>
                        <td>736</td>
                        <td>78,3%</td>
                        <td>6,6%</td>
                        <td>7,56</td>
                        <td>4:30</td>
                        <td>76.8%</td>
                      </tr>
                    </tbody>
                  </Table>
                </PerfectScrollbar>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6}>
          <SocialCard
            params={{
              icon: "fa fa-envelope-open",
              class: "blue",
              variant: "primary",
              primaryTitle: "8.62k",
              primaryText: "Người đăng ký",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Quản lý danh sách",
            }}
          />
          <SocialCard
            params={{
              icon: "fab fa-twitter",
              class: "green",
              variant: "success",
              primaryTitle: "+40",
              primaryText: "Người theo dõi",
              secondaryText: "Danh sách chính của bạn đang phát triển",
              label: "Kiểm tra chúng",
            }}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DashAnalytics;
