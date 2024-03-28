import React from "react";
import { Button, Table } from "antd";
import { HandCoins, MessageCircleWarning, CircleAlert } from "lucide-react";
import { DollarOutlined } from "@ant-design/icons";

const Earnings = () => {
  const dummyCreditData = {
    creditBalance: 100,
    creditsForThisMonth: 50,
  };

  const dummyActivityData = {
    activity: [
      {
        date: "2021-10-01",
        actionID: "A1237",
        type: "Earning",
        user: "Mahinda Rajapaksha",
        credits: 50,
      },
      {
        date: "2021-10-02",
        actionID: "A1238",
        type: "Earning",
        user: "Basil Rajapaksha",
        credits: 30,
      },
      {
        date: "2021-10-03",
        actionID: "A1239",
        type: "Earning",
        user: "Namal Rajapaksha",
        credits: 40,
      },
      {
        date: "2021-10-04",
        actionID: "A1240",
        type: "Earning",
        user: "Gotabay Rajapaksha",
        credits: 20,
      },
      {
        date: "2021-10-05",
        actionID: "A1241",
        type: "Earning",
        user: "Chamal Rajapaksha",
        credits: 35,
      },
    ],
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action ID",
      dataIndex: "actionID",
      key: "actionID",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (record) => (
        <span
          style={{
            display: "flex",
          }}
        >
          <Button
            type="primary"
            // onClick={() => handleView(record._id)}
            style={{ marginRight: "5px", borderRadius: "5px" }}
          >
            View
          </Button>

          <Button
            danger
            // onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div>
        {/* root div for all page */}
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Page title*/}
          <div>
            <span
              style={{ fontSize: "30px", fontWeight: 600, color: "GrayText" }}
            >
              Earnings
            </span>
          </div>
          <div>
            <Button style={{ paddingBottom: "10px" }}>View Activity</Button>
            <Button style={{ marginLeft: "10px", paddingBottom: "10px" }}>
              Spends
            </Button>
              <Button
                type="primary"
                style={{
                  marginLeft: "10px",
                  borderRadius: "5px",
                  paddingBottom: "10px",
                }}
              >
                Withdraw
              </Button>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: "20px" }}>
          {/* Credit balance cards */}
          <div
            style={{
              width: "50vw",
              marginRight: "5px",
              display: "flex",
              padding: "40px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              backgroundColor: "#92f79a",
              borderRadius: "15px",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <DollarOutlined style={{ fontSize: "70px", color: "#fff" }} />
            </div>
            <div>
              <div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#fff",
                  }}
                >
                  Credit Balance
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {dummyCreditData.creditBalance + " CR"}
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "50vw",
              marginLeft: "5px",
              display: "flex",
              padding: "40px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              backgroundColor: "#81aaf0",
              borderRadius: "15px",
            }}
          >
            <div style={{ marginRight: "50px" }}>
              <HandCoins size={70} style={{ color: "#fff" }} />
            </div>
            <div>
              <div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "#fff",
                  }}
                >
                  Credits earned in this month
                </span>
              </div>
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 500,
                    color: "#fff",
                  }}
                >
                  {dummyCreditData.creditsForThisMonth + " CR"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#dbdbdb",
            marginTop: "20px",
            padding: "20px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "15px",
          }}
        >
          {/* Details box Card */}
          <div>
            <CircleAlert style={{ marginTop: "-20px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ marginLeft: "40px", marginTop: "10px" }}>
              <ul>
                <li>
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>
                    One credit = 100.00 LKR
                  </span>
                </li>
                <li>
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>
                    You can make a withdrawal request when you have more than 10
                    Credits
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <MessageCircleWarning
                size={100}
                strokeWidth="1.25px"
                style={{ paddingRight: "10px", marginTop: "-15px" }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{ fontSize: "20px", fontWeight: "500", color: "GrayText" }}
            >
              Activity History
            </span>
              <Button
                type="primary"
                style={{
                  marginLeft: "10px",
                  borderRadius: "5px",
                  paddingBottom: "10px",
                }}
              >
                Export Report
              </Button>
          </div>
          <Table
            style={{ borderTop: "4px solid #92f79a" }}
            dataSource={dummyActivityData.activity}
            columns={columns}
          />
        </div>
      </div>
    </>
  );
};

export default Earnings;
