import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

type FieldType = {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: any;
  nationality: string;
  citizenID: string[];
  gender: string;
  mobilePhone: string;
  phoneNumber: string;
  passportNo: string;
  expectedSalary: string;
};

const UserForm = ({
  dispatch,
  addUser,
  editUser,
  editingUser,
  setEditingUser,
}: any) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<Omit<FieldType, "id">>({
    title: "",
    firstname: "",
    lastname: "",
    birthday: "",
    nationality: "",
    citizenID: ["", "", "", "", ""],
    gender: "",
    mobilePhone: "",
    phoneNumber: "",
    passportNo: "",
    expectedSalary: "",
  });

  useEffect(() => {
    if (editingUser) {
      setIsEditing(true);
      const { mobilePhone, ...rest } = editingUser;
      const updatedFormValues = {
        ...rest,
        mobilePhone: mobilePhone.substring(0, 3),
        phoneNumber: mobilePhone.substring(3),
        birthday: moment(editingUser.birthday, "YYYY-MM-DD"),
      };
      setFormValues(updatedFormValues);
      form.setFieldsValue(updatedFormValues);
    } else {
      setIsEditing(false);
      handleResetForm();
    }
  }, [editingUser, form]);

  const handleChange = (key: string, value: any) => {
    if (key === "birthday" && value) {
      value = moment(value, "YYYY-MM-DD");
    }
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    form.setFieldsValue({
      [key]: value,
    });
  };

  const handleCitizenIDChange = (index: number, value: string) => {
    const newCitizenID = [...formValues.citizenID];
    newCitizenID[index] = value;
    setFormValues((prev) => ({
      ...prev,
      citizenID: newCitizenID,
    }));
    form.setFieldsValue({
      citizenID: newCitizenID,
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const formattedBirthday = moment(formValues.birthday).format("YYYY-MM-DD");
    const mobilePhone = formValues.mobilePhone + formValues.phoneNumber;
    const newUser = {
      ...formValues,
      birthday: formattedBirthday,
      id: isEditing && editingUser ? editingUser.id : uuidv4(),
      mobilePhone,
    };
    if (isEditing) {
      dispatch(editUser(newUser));
      setIsEditing(false);
      setEditingUser(null);
    } else {
      dispatch(addUser(newUser));
    }

    alert("บันทึกสำเร็จ");
    handleResetForm();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const handleResetForm = () => {
    setFormValues({
      title: "",
      firstname: "",
      lastname: "",
      birthday: "",
      nationality: "",
      citizenID: ["", "", "", "", ""],
      gender: "",
      mobilePhone: "",
      phoneNumber: "",
      passportNo: "",
      expectedSalary: "",
    });

    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={formValues}
      className="containerForm"
    >
      <Row gutter={10}>
        <Col span={4}>
          <Form.Item
            label={t("test2.contentSet2.content1")}
            name="title"
            rules={[
              { required: true, message: t("test2.contentSet2.content1") },
            ]}
          >
            <Select
              placeholder={t("test2.contentSet2.content1")}
              value={formValues.title}
              onChange={(value) => handleChange("title", value)}
            >
              <Select.Option value="Mr.">
                {t("test2.contentSet2.content33")}
              </Select.Option>
              <Select.Option value="Mrs.">
                {t("test2.contentSet2.content34")}
              </Select.Option>
              <Select.Option value="Ms.">
                {t("test2.contentSet2.content35")}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label={t("test2.contentSet2.content2")}
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input
              value={formValues.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label={t("test2.contentSet2.content3")}
            name="lastname"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input
              value={formValues.lastname}
              name="lastname"
              onChange={(e) => handleChange("lastname", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={6}>
          <Form.Item
            label={t("test2.contentSet2.content4")}
            name="birthday"
            rules={[{ required: true, message: "Please input your birthday!" }]}
          >
            <DatePicker
              placeholder={t("test2.contentSet2.content5")}
              value={formValues.birthday}
              name="birthday"
              onChange={(date, dateString) =>
                handleChange("birthday", dateString)
              }
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label={t("test2.contentSet2.content36")}
            name="nationality"
            rules={[
              { required: true, message: "Please select your nationality!" },
            ]}
          >
            <Select
              placeholder={t("test2.contentSet2.content6")}
              value={formValues.nationality}
              onChange={(value) => handleChange("nationality", value)}
            >
              <Select.Option value="Thai">
                {t("test2.contentSet2.content25")}
              </Select.Option>
              <Select.Option value="French">
                {t("test2.contentSet2.content26")}
              </Select.Option>
              <Select.Option value="American">
                {t("test2.contentSet2.content27")}
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={t("test2.contentSet2.content7")}
            name="citizenID"
            rules={[]}
          >
            <Row gutter={16}>
              {formValues.citizenID.map((value, index) => (
                <Col
                  className="CitizenIDForm"
                  span={index === 0 ? 3 : 5}
                  key={index}
                >
                  <span className="span">-</span>
                  <Input
                    maxLength={index === 0 ? 1 : 5}
                    value={value}
                    onChange={(e) =>
                      handleCitizenIDChange(index, e.target.value)
                    }
                  />
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={t("test2.contentSet2.content8")}
            name="gender"
            rules={[{ required: true, message: "Please select your gender!" }]}
          >
            <Radio.Group
              value={formValues.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <Radio value="Male">{t("test2.contentSet2.content9")}</Radio>
              <Radio value="Female">{t("test2.contentSet2.content10")}</Radio>
              <Radio value="Unisex">{t("test2.contentSet2.content11")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={10}>
          <Form.Item
            label={t("test2.contentSet2.content12")}
            name="mobilePhone"
            rules={[
              { required: true, message: "Please select your country code!" },
            ]}
          >
            <Select
              value={formValues.mobilePhone}
              onChange={(value) => handleChange("mobilePhone", value)}
            >
              <Select.Option value="+66">+66</Select.Option>
              <Select.Option value="+1">+1</Select.Option>
              <Select.Option value="+33">+33</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phoneNumber">
            <Input
              value={formValues.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item label={t("test2.contentSet2.content14")} name="passportNo">
            <Input
              value={formValues.passportNo}
              onChange={(e) => handleChange("passportNo", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label={t("test2.contentSet2.content15")}
            name="expectedSalary"
            rules={[
              { required: true, message: "Please input your expected salary!" },
            ]}
          >
            <Input
              value={formValues.expectedSalary}
              onChange={(e) => handleChange("expectedSalary", e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col offset={3} span={4}>
          <Button onClick={handleResetForm}>
            {t("test2.contentSet2.content16")}
          </Button>
        </Col>
        <Col span={3}>
          <Button htmlType="submit">{t("test2.contentSet2.content17")}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
