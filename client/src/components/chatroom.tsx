import styled from "@emotion/styled";
import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import React from "react";
import { IRecord } from "../../common/record";
import { IUser } from "../../common/user";
import SendIcon from "@mui/icons-material/Send";
import dayjs from "dayjs";

const StyledWrapper = styled(Box)(() => ({
  height: "calc(100% - 40px)",
  padding: 16,
  flex: "1 1 auto",
}));

const StyledChatBox = styled(Box)(() => ({
  border: "1px solid #B2FAF6",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const StyledListWrapper = styled(Box)(() => ({
  flex: "1 1 auto",
  overflow: "scroll",
}));

const StyledMessageBoxWrapper = styled(Box)(() => ({
  flex: "0 1 auto",
  position: "relative",
  display: "flex",
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input": {
    width: "calc(100% - 50px)",
  },
}));

const StyledSend = styled(IconButton)(() => ({
  position: "absolute",
  right: 0,
  width: "40px",
  height: "40px",
  color: "#B2FAF6",
}));

interface ChatroomProps {
  user: IUser;
  users: IUser[];
  records: IRecord[];
  onMessageSend: (msg: string) => void;
}

export const Chatroom = React.memo<ChatroomProps>(
  ({ user, users, records, onMessageSend }) => {
    const [msg, setMsg] = React.useState("");
    const listRef = React.useRef<HTMLDivElement>(null);

    const handleSendMsg = () => {
      onMessageSend(msg);
      setMsg("");
    };

    React.useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollTo(0, listRef.current.scrollHeight);
      }
    }, [records]);

    return (
      <StyledWrapper>
        <StyledChatBox>
          <StyledListWrapper ref={listRef}>
            {records.map((record, index) => (
              <Message key={index} record={record} users={users} />
            ))}
          </StyledListWrapper>
          <StyledMessageBoxWrapper>
            <StyledTextField
              fullWidth
              onChange={(e) => {
                e.persist();
                setMsg(e.target.value);
              }}
              value={msg}
            />
            <StyledSend disabled={msg === ""} onClick={handleSendMsg}>
              <SendIcon />
            </StyledSend>
          </StyledMessageBoxWrapper>
        </StyledChatBox>
      </StyledWrapper>
    );
  }
);

const StyledMessage = styled(Typography)(() => ({
  width: "100%",
  padding: "8px 4px",
  color: "lightgray",
  overflowWrap: "break-word",
}));

interface MessageProps {
  record: IRecord;
  users: IUser[];
}
const Message = React.memo<MessageProps>(({ record, users }) => {
  const messageText = (record: IRecord) => {
    switch (record.type) {
      case "Notify": {
        const fromUser = users.find((u) => u._id === record.from);
        if (!fromUser) return "";
        return `${fromUser.displayName}: ${record.msg}`;
      }
      case "Transfer": {
        const fromUser = users.find((u) => u._id === record.from);
        const toUser = users.find((u) => u._id === record.to);
        if (!fromUser || !toUser) return "";
        return `${fromUser.displayName} 轉了 ${record.amount} 給 ${toUser.displayName}`;
      }
      case "Withdraw": {
        const fromUser = users.find((u) => u._id === record.from);
        if (!fromUser) return "";
        return `${fromUser.displayName} 提出了 ${record.amount}`;
      }
      case "Allot": {
        const toUser = users.find((u) => u._id === record.to);
        if (!toUser) return "";
        return `${toUser.displayName} 獲得了 ${record.amount}`;
      }
    }
  };

  return (
    <StyledMessage>
      {messageText(record)}
      &nbsp;
      <Typography variant="caption">
        {dayjs(record.createdAt).format("MM/DD hh:mm")}
      </Typography>
    </StyledMessage>
  );
});
