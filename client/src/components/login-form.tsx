import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { IUser } from "../../common/user";
import { login as ApiLogin } from "../api/user/user";

const StyledWrapper = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const StyledTextFieldsWrapper = styled(Box)(() => ({
  width: "80%",
  maxWidth: "640px",
}));

const StyledTextField = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

const StyledButton = styled(Button)(() => ({}));

interface LoginFormProps {
  onLogin: (user: IUser) => void;
}

export const LoginForm = React.memo<LoginFormProps>(({ onLogin }) => {
  const [form, setForm] = React.useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const submittable = React.useMemo(
    () => form.username !== "" && form.password !== "",
    [form]
  );

  const login = React.useCallback(async () => {
    const loginRes = await ApiLogin(form);

    if (loginRes.data) {
      onLogin(loginRes.data);
    }
  }, [form, onLogin]);

  return (
    <StyledWrapper>
      <StyledTextFieldsWrapper>
        <StyledTextField
          fullWidth
          onChange={(e) => {
            e.persist();
            setForm((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
          value={form.username}
          placeholder="帳號"
          label="帳號"
        />
        <StyledTextField
          fullWidth
          onChange={(e) => {
            e.persist();
            setForm((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
          value={form.password}
          placeholder="密碼"
          label="密碼"
          type={"password"}
        />
      </StyledTextFieldsWrapper>
      <StyledButton disabled={!submittable} onClick={login}>
        登入
      </StyledButton>
    </StyledWrapper>
  );
});
