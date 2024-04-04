import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  TreeSelect,
  notification,
} from "antd";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { ArrowLeftOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";
import { IOption } from "../../interfaces/IOption";
import { IProduct } from "../../interfaces/Product";
import ObjectHelper from "../../config/objectHelper";
import TextArea from "antd/es/input/TextArea";
import categoryService from "../../services/categoryService";
import productService from "../../services/productsService";
import { useEffect } from "react";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export const Products = () => {
  const params: any = useParams();
  const history = useHistory();

  const [api, contextHolder] = notification.useNotification();

  const key = "updatable";
  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      key,
      message: message,
    });
  };

  const handleSubmit = async (values: IProduct) => {
    try {
      const { data } = params.id
        ? await productService.update({ ...values, id: params.id })
        : await productService.create(values);

      const notificationType = data.isOk ? "success" : "error";
      openNotification(notificationType, data.message);
    } catch (error) {
      openNotification("error", "Error occurred");

      console.error("Error occurred:", error);
    }
  };

  const [categories, setCategories] = useState<IOption[]>([]);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        if (params.id) {
          const { data } = await productService.getById(params.id);
          form.setFieldsValue({
            name: data.result.name,
            price: data.result.price,
            categoryId: data.result.categoryId,
            description: data.result.description,
          });
        }
      } catch (error) {
        openNotification("error", "Error in load categories!");
      }
    };

    fetchProductById();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await categoryService.getAll();
        const parsedCategories = ObjectHelper.getValuesParseToSelect(
          data.result
        ); // Chame a função de conversão de valores
        setCategories(parsedCategories);
      } catch (error) {
        openNotification("error", "Error in load categories!");
      }
    };

    fetchCategory(); // Call fetchCategory inside the useEffect callback
  }, []); // Empty dependency array to run only once when the component mounts

  const [form] = Form.useForm();
  return (
    <>
      <Button
        icon={<ArrowLeftOutlined />}
        htmlType="button"
        onClick={() => history.push("/")}
      >
        Back to Product List
      </Button>
      <Divider></Divider>
      {contextHolder}

      <Card title="Add Product" bordered={false}>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row>
            <Col span={12}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Category"
                name="categoryId"
                rules={[
                  { required: true, message: "Please select the category!" },
                ]}
              >
                <TreeSelect treeData={categories} allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Space>
                  <SubmitButton form={form}>Submit</SubmitButton>
                  <Button htmlType="reset">Reset</Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br></br>
    </>
  );
};
