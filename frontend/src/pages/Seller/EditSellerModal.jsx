import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const EditSellerModal = ({ visible, onCancel, userId, userData, onUpdate }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setUserDetails = async () => {
      // Set form values with the fetched user data
      form.setFieldsValue({
        fullName: userData.fullName,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        NIC: userData.NIC,
      });
    };

    if (visible && userData) {
      setUserDetails();
    }
  }, [userData, visible, form]);

  // Update the data
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token").replace("Bearer ", "");

      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/sellar/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        console.log("User updated successfully");
        message.success("User updated successfully!");
        onUpdate();
        onCancel();
      } else {
        console.error("Unexpected server response:", response);
        message.error("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error.response.data);
      message.error("Failed to update user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit User"
      visible={visible}
      onCancel={onCancel}
      style={{ top: 20 }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={form.submit}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter the full name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter the email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please enter the phone number!",
            },
            {
              pattern: new RegExp("^[0-9]{10}$"),
              message: "Please enter a valid phone number!",
            },
            {
              max: 10,
              message: "Phone number must be 10 digits long!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="NIC"
          label="NIC"
          rules={[{ required: true, message: "Please enter the NIC" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSellerModal;