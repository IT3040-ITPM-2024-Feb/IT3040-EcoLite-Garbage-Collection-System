import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CompanyAll/companyAll.scoped.css";
// import Dashboard from "../../Dashboard";
import { Layout } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../../partials/Header";
import Image from "./garbage.jpg";

const AllCompany = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/company/all");
      if (response.status === 200) {
        setCompany(response.data.companyAllData);
        console.log("Companies Retrieved successful", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Layout style={{ padding: "15px 24px 24px" }}>
        {/* <Dashboard/> */}
        <HeaderComponent />
        <Layout style={{ padding: "100px 24px 24px" }}>
          <div class="heading-row">
            <h1 className="companyall-heading">Buyer Companies</h1>
            <button class="heading-row-btn">Ranking</button>
          </div>
          <Layout style={{ padding: "0px 200px 24px" }}>
            <div className="card-item-container">
              {company &&
                company.map((item) => (
                  <div className="container" key={item._id}>
                    <div className="header-container">
                      <img
                        className="image-comapnyall"
                        // src={item.companyImage}
                        src={Image}
                        alt=""
                      />
                    </div>
                    <div className="footer-container">
                      <div className="footer-icons">
                        <div className="footer-icons-left">
                          <div className="footer-icons-left-1">
                            <LikeOutlined
                              style={{
                                fontSize: "25px",
                                height: "30px",
                                color: "#097969",
                              }}
                            />
                          </div>
                          <div className="footer-icons-left-2">
                            <DislikeOutlined
                              style={{
                                fontSize: "25px",
                                height: "30px",
                                color: "#097969",
                              }}
                            />
                          </div>
                        </div>
                        <div className="footer-icons-right">
                          <PhoneOutlined
                            style={{
                              fontSize: "25px",
                              height: "30px",
                              color: "#097969",
                            }}
                          />
                        </div>
                      </div>
                      <div className="description">
                        <span>{item.companyName}</span>
                      </div>
                      <div className="description">
                        <span>{`+${item.numberOfCenters} Centers`}</span>
                      </div>
                      <div className="more-details-btn">
                        {/* <a href={`/company/${item._id}`}> */}
                        <button>For More Details</button>
                        {/* </a> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AllCompany;
