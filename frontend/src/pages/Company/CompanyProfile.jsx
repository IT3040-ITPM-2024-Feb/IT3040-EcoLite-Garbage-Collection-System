import React, { useEffect, useState } from "react";
import { Card, Spin, Avatar, Button, Input, Form, message } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import avatar from "../../assets/images/UserGlobal/avatar.png";
import EditCompanyModal from "./EditCompanyModal";

const { Meta } = Card;

const CompanyProfile = () => {
  // Get the user role, id, and token from local storage
  const userRole = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenWithoutBearer = token.replace("Bearer ", "");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);

  //Test data until user's full API created (Delete this later)
  const testUserData = {
    companyName: "Isuru Dananjaya Company",
    email: "testdj@test.com",
    numberOfCenters: 7,
    companySlogan: "test slogan",
    companyAbout: "test about",
    openHours: "8.00 AM",
    closeHours: "5.00 PM",
    subscribedSellers: [
      {
        sellerId: "123",
        sellerName: "seller1",
      },
      {
        sellerId: "124",
        sellerName: "seller2",
      },
      {
        sellerId: "125",
        sellerName: "seller3",
      },
    ],
    subscribedSellersCount: 3,
  };

  // Use the useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Refactor the user role to match the API endpoint
        let refactoredRole = "";

        if (userRole === "seller") {
          refactoredRole = "sellar";
        } else {
          refactoredRole = userRole;
        }

        // Fetch the user data from the API
        const response = await axios.get(
          `http://localhost:5000/api/${refactoredRole}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenWithoutBearer}`,
            },
          }
        );

        // Set the user data to the formik values
        setUser(response.data.buyer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        message.error("Error fetching user");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleEditCompanyModalOpen = () => {
    setEditModalVisible(true);
  };

  const handleEditCompanyModalCancel = () => {
    setEditModalVisible(false);
    window.location.reload();
  };

  // Display the user profile card with skeleton loading spinner while the user data is being fetched
  return (
    <div style={{ marginTop: "50px" }}>
      {loading ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size="large"
        />
      ) : user ? (
        <div>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Avatar size={150} src={avatar} />
          </div>
          <Card
            style={{
              width: 600,
              margin: "0 auto 20px auto",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            loading={loading}
          >
            <Meta
              title="Company Information"
              description={
                <>
                  <Form form={form} layout="vertical">
                    <Form.Item label="Company Name">
                      <Input value={testUserData.companyName} readOnly />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input value={user.user.email} readOnly />
                    </Form.Item>
                    <Form.Item label="Number Of centers">
                      <Input value={user.numberOfCenters} readOnly />
                    </Form.Item>
                    <Form.Item label="Company Slogan">
                      <Input value={user.companySlogan} readOnly />
                    </Form.Item>
                    <Form.Item label="Open Hours">
                      <Input value={user.openHours} readOnly />
                    </Form.Item>
                    <Form.Item label="Close Hours">
                      <Input value={user.closeHours} readOnly />
                    </Form.Item>
                    <Form.Item label="Subscribed Sellers">
                      <Input value={user.subscribedSellersCount} readOnly />
                    </Form.Item>
                  </Form>
                  <Button
                    type="primary"
                    onClick={handleEditCompanyModalOpen}
                    style={{
                      marginRight: "5px",
                      borderRadius: "5px",
                      float: "right",
                    }}
                  >
                    Update
                  </Button>
                </>
              }
            />
          </Card>
        </div>
      ) : (
        <div>No user found</div>
      )}
      {/* Edit User Modal */}
      <EditCompanyModal
        userId={userId}
        userData={testUserData}
        visible={editModalVisible}
        onCancel={handleEditCompanyModalCancel}
        onUpdate={handleEditCompanyModalOpen}
      />
    </div>
  );
};

export default CompanyProfile;
