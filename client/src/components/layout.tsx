import styled from "@emotion/styled";
import { Avatar, Box, Container, IconButton } from "@mui/material";
import React from "react";
import { IUser } from "../../common/user";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledRoot = styled(Container)(() => ({
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "calc(var(--vh, 1vh) * 100)",
}));

const StyledHeader = styled(Box)(() => ({
  width: "100%",
  height: "64px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const StyledAvatar = styled(Avatar)(() => ({
  width: "40px",
  height: "40px",
  border: "2px solid #B2FAF6",
}));

const StyledLogout = styled(IconButton)(() => ({
  width: "40px",
  height: "40px",
  color: "#B2FAF6",
}));

const StyledChat = styled(IconButton)(() => ({
  width: "40px",
  height: "40px",
  color: "#B2FAF6",
}));

interface LayoutProps {
  user?: IUser;
  logout: () => void;
  chatMode: boolean;
  onChatClick: () => void;
  children: React.ReactNode;
}
export const Layout = React.memo<LayoutProps>(
  ({ user, logout, chatMode, onChatClick, children }) => {
    return (
      <StyledRoot>
        {user && (
          <StyledHeader>
            <StyledAvatar src={user.avatar} />
            <StyledChat onClick={onChatClick}>
              {!chatMode ? <ChatIcon /> : <ArrowBackIcon />}
            </StyledChat>
            <StyledLogout onClick={logout}>
              <LogoutIcon />
            </StyledLogout>
          </StyledHeader>
        )}
        {children}
      </StyledRoot>
    );
  }
);
