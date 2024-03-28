import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button, Card, Rate, Divider } from "antd";
import axios from "axios";
import { SendOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CustomerServiceModal = () => {
  const [products, setProducts] = useState([]);
  const [conversation, setConversation] = useState([]);

  const initialValues = {
    productName: "",
  };

  const onSubmit = (values, { resetForm }) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(values.productName.toLowerCase())
    );
    setConversation((prevConversation) => [
      ...prevConversation,
      { type: "user", content: values.productName },
      ...filtered.map((product) => ({ type: "product", content: product })),
    ]);
    resetForm();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        position: "relative",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
        {conversation.map((message, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {message.type === "user" ? (
              <div style={{ textAlign: "right", marginRight: "10px" }}>
                <strong>You:</strong> {message.content}
              </div>
            ) : (
              <Card
                style={{ width: "100%" }}
                cover={
                  <img alt={message.content.name} src={message.content.image} />
                }
              >
                <Meta
                  title={message.content.name}
                  description={message.content.description}
                />
                <div style={{ marginTop: "10px" }}>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={message.content.rating}
                  />
                  <Button type="primary" style={{ marginLeft: "10px" }}>
                    View Details
                  </Button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
      <Divider />
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form style={{ display: "flex", alignItems: "center" }}>
            <Field name="productName">
              {({ field, meta }) => (
                <div style={{ flex: 1, marginRight: "5px" }}>
                  <Input
                    {...field}
                    placeholder="Enter product name"
                    style={{ width: "100%" }}
                  />
                  {meta.touched && meta.error && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {meta.error}
                    </div>
                  )}
                </div>
              )}
            </Field>
            <Button
              type="primary"
              htmlType="submit"
              style={{ paddingBottom: "15px" }}
            >
              Send
              <SendOutlined />
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default CustomerServiceModal;
