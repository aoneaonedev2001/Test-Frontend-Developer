import React, { useState } from "react";
import UserForm from "../Components/UserForm";
import UserTable from "../Components/UserTable";
import { useTranslation } from "react-i18next";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
  findUserById,
} from "../redux/slice/userSlice";

const Test2 = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.userData.users);
  const selectedUser = useSelector(
    (state: RootState) => state.userData.selectedUser
  );
  const { t } = useTranslation();
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div>
      <h1>{t("test2.contentSet1.content1")}</h1>
      <div className="">
        <UserForm
          dispatch={dispatch}
          addUser={addUser}
          editUser={editUser}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
        <UserTable
          dispatch={dispatch}
          findUserById={findUserById}
          users={users}
          deleteUser={deleteUser}
          setEditingUser={setEditingUser}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};

export default Test2;
