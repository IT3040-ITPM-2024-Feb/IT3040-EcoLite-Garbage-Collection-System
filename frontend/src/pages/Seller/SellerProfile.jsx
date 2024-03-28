import React, { useEffect, useState } from "react";
import { Card, Spin, Avatar, Button, Input, Form, message } from "antd";
import axios from "axios";
import avatar from "../../assets/images/UserGlobal/avatar.png";
import EditSellerModal from "./EditSellerModal";

const { Meta } = Card;

const SellerProfile = () => {
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
    fullName: "Isuru Dananjaya",
    email: "dananjayahbi@gmail.com",
    username: "dananjayahbi",
    role: "seller",
    phone: "0712345678",
    NIC: "1999999999V",
  };

  const theme = {
    token: {
      // Seed Token
      colorPrimary: "#00b96b",
      borderRadius: 2,

      // Alias Token
      colorBgContainer: "#f6ffed",
    },
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
        setUser(response.data.seller);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user by ID:", error);
        message.error("Error fetching user");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleEditSellerModalOpen = () => {
    setEditModalVisible(true);
  };

  const handleEditSellerModalCancel = () => {
    setEditModalVisible(false);
    window.location.reload();
  };

  // Display the user profile card with skeleton loading spinner while the user data is being fetched
  return (
    <div style={{ marginTop: "50px" }}>
      {loading ? (
        <Spin
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
              title="User Information"
              description={
                <>
                  <Form form={form} layout="vertical">
                    <Form.Item label="Full Name">
                      <Input value={testUserData.fullName} readOnly />
                    </Form.Item>
                    <Form.Item label="Username">
                      <Input value={testUserData.username} readOnly />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input value={user.user.email} readOnly />
                    </Form.Item>
                    <Form.Item label="Role">
                      <Input value={testUserData.role} readOnly />
                    </Form.Item>
                    <Form.Item label="Phone">
                      <Input value={user.phone} readOnly />
                    </Form.Item>
                    <Form.Item label="NIC">
                      <Input value={testUserData.NIC} readOnly />
                    </Form.Item>
                    {/* Add more fields here */}
                  </Form>
                  <Button
                    type="primary"
                    onClick={handleEditSellerModalOpen}
                    style={{
                      marginRight: "5px",
                      borderRadius: "5px",
                      float: "right",
                    }}
                  >
                    View
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
      <EditSellerModal
        userId={userId}
        userData={testUserData}
        visible={editModalVisible}
        onCancel={handleEditSellerModalCancel}
        onUpdate={handleEditSellerModalOpen}
      />
    </div>
  );
};

export default SellerProfile;
