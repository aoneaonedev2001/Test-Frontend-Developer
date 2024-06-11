import React, { useEffect, useState } from "react";
import { Button, Checkbox, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";

interface DataType {
  key: string;
  name: string;
  gender: string;
  mobilePhone: string;
  nationality: string;
}

const UserTable = ({
  users,
  selectedUser,
  dispatch,
  deleteUser,
  setEditingUser,
  findUserById,
}: any) => {
  const { t, i18n } = useTranslation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    localStorage.setItem("Users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (selectedUser) {
      setEditingUser(selectedUser);
    }
  }, [selectedUser]);

  const columns: TableColumnsType<DataType> = [
    {
      title: t("test2.contentSet2.content21"),
      dataIndex: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: t("test2.contentSet2.content22"),
      dataIndex: "gender",
      defaultSortOrder: undefined,
      sorter: (a, b) => (a.gender || "").localeCompare(b.gender || ""),
    },
    {
      title: t("test2.contentSet2.content12"),
      dataIndex: "mobilePhone",
      sorter: (a, b) =>
        (a.mobilePhone || "").localeCompare(b.mobilePhone || ""),
    },
    {
      title: t("test2.contentSet2.content36"),
      dataIndex: "nationality",
      sorter: (a, b) =>
        (a.nationality || "").localeCompare(b.nationality || ""),
    },
    {
      title: t("test2.contentSet2.content28"),
      render: (_, record) => (
        <div className="manage">
          <p onClick={() => handleEdit(record)}>
            {t("test2.contentSet2.content29")}
          </p>
          <p style={{ marginLeft: 8 }} onClick={() => handleDelete(record.key)}>
            {t("test2.contentSet2.content30")}
          </p>
        </div>
      ),
    },
  ];

  const handleEdit = (record: DataType) => {
    dispatch(findUserById(record.key));
  };

  const handleDelete = (key: React.Key) => {
    dispatch(deleteUser(key));
  };

  const onSelectAllChange = (e: any) => {
    setSelectedRowKeys(
      e.target.checked ? users.map((item: any) => item.id) : []
    );
  };

  const onDeleteSelectedRow = () => {
    selectedRowKeys.forEach((key) => {
      dispatch(deleteUser(key));
    });
    setSelectedRowKeys([]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const dataSource = users.map((user: any) => {
    const genderTranslation =
      i18n.language === "th"
        ? user.gender === "Male"
          ? "ชาย"
          : user.gender === "Female"
          ? "หญิง"
          : "ไม่ระบุ"
        : user.gender;
    const nationalityTranslation =
      i18n.language === "th"
        ? user.nationality === "Thai"
          ? "ไทย"
          : user.nationality === "French"
          ? "ฝรั่งเศส"
          : "อเมริกา"
        : user.gender;

    return {
      key: user.id,
      name: `${user.firstname} ${user.lastname}`,
      gender: genderTranslation,
      mobilePhone: user.mobilePhone,
      nationality: nationalityTranslation,
    };
  });

  return (
    <div className="containerTable">
      <Checkbox.Group>
        <Checkbox value="radio" onChange={onSelectAllChange}>
          {t("test2.contentSet2.content19")}
        </Checkbox>
      </Checkbox.Group>

      <Button onClick={onDeleteSelectedRow}>
        {t("test2.contentSet2.content20")}
      </Button>

      <Table
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["topRight"],
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return <>{t("test2.contentSet2.content31")}</>;
            }
            if (type === "next") {
              return <>{t("test2.contentSet2.content32")}</>;
            }
            if (type === "page") {
              return <Button>{current}</Button>;
            }
            return originalElement;
          },
        }}
      />
    </div>
  );
};

export default UserTable;
