import styled from "@emotion/styled";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { IUser } from "../../common/user";

const StyledWrapper = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StyledListItem = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  border: "1px solid #B2FAF6",
  padding: "4px 8px",
  alignItems: "center",
  overflow: "scroll",
}));

const StyledName = styled(Typography)(() => ({
  color: "lightgray",
  marginRight: "1rem",
}));
const StyledBalance = styled(Typography)(() => ({
  color: "lightgray",
  width: "100%",
  marginRight: "1rem",
}));
const StyledButton = styled(Button)(() => ({
  minWidth: "max-content",
}));
const StyledAvatar = styled(Avatar)(() => ({
  width: "40px",
  height: "40px",
  border: "2px solid #B2FAF6",
  marginRight: "1rem",
}));

interface UserListProps {
  me: IUser;
  users: IUser[];
  onTransferClick: (to: IUser) => void;
  onAllotClick: (to: IUser) => void;
  onWithdrawClick: (from: IUser) => void;
}
export const UserList = React.memo<UserListProps>(
  ({ me, users, onTransferClick, onAllotClick, onWithdrawClick }) => {
    return (
      <StyledWrapper>
        {users
          .sort((a, b) => b.balance - a.balance)
          .map((user, index) => (
            <StyledListItem key={index}>
              <StyledAvatar src={user.avatar} />
              <StyledName>{user.displayName}</StyledName>
              <StyledBalance>${user.balance}</StyledBalance>
              {user._id !== me._id && (
                <StyledButton onClick={() => onTransferClick(user)}>
                  轉帳
                </StyledButton>
              )}
              {me.role === "Admin" && (
                <>
                  <StyledButton onClick={() => onAllotClick(user)}>
                    給予
                  </StyledButton>
                  <StyledButton onClick={() => onWithdrawClick(user)}>
                    提款
                  </StyledButton>
                </>
              )}
            </StyledListItem>
          ))}
      </StyledWrapper>
    );
  }
);
