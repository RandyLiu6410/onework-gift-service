import styled from "@emotion/styled";
import { Box, Button, Dialog, TextField } from "@mui/material";
import React from "react";
import { IUser } from "../../common/user";
import { UserList } from "./user-list";
import { allot, transfer, withdraw } from "../api/user/user";
import { RecordType } from "../../common/record";

const StyledWrapper = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledBalanceWrapper = styled(Box)(() => ({
  width: "80%",
  aspectRatio: "1",
  border: "4px solid #B2FAF6",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "32px",
  color: "#B2FAF6",
  marginBottom: "40px",
}));

const StyledTransferWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

interface MainProps {
  user: IUser;
  users: IUser[];
}

export const Main = React.memo<MainProps>(({ user, users }) => {
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [to, setTo] = React.useState<IUser>();
  const [from, setFrom] = React.useState<IUser>();
  const [transferAmount, setTransferAmount] = React.useState(0);
  const [mode, setMode] = React.useState<RecordType>("Transfer");

  const onTransferClick = (to: IUser) => {
    setTo(to);
    setTransferOpen(true);
    setMode("Transfer");
  };
  const onAllotClick = (to: IUser) => {
    setTo(to);
    setTransferOpen(true);
    setMode("Allot");
  };
  const onWithdrawClick = (from: IUser) => {
    setFrom(from);
    setTransferOpen(true);
    setMode("Withdraw");
  };

  const handleTransferAmountChange = (value: number) => {
    setTransferAmount(value);
  };

  const transferable = React.useMemo(
    () => transferAmount > 0 && (!!to || !!from),
    [transferAmount, to]
  );

  const handleTransfer = React.useCallback(async () => {
    if (transferAmount > 0 && !!to) {
      await transfer({
        from: user._id,
        to: to._id,
        amount: transferAmount,
      });
      setTransferOpen(false);
    }
  }, [to, transferAmount]);

  const handleAllot = React.useCallback(async () => {
    if (transferAmount > 0 && !!to) {
      await allot({
        to: to._id,
        amount: transferAmount,
      });
      setTransferOpen(false);
    }
  }, [to, transferAmount]);

  const handleWithdraw = React.useCallback(async () => {
    if (transferAmount > 0 && !!from) {
      await withdraw({
        from: from._id,
        amount: transferAmount,
      });
      setTransferOpen(false);
    }
  }, [to, transferAmount]);

  const submit = async () => {
    switch (mode) {
      case "Transfer":
        await handleTransfer();
        break;
      case "Allot":
        await handleAllot();
        break;
      case "Withdraw":
        await handleWithdraw();
        break;
    }
  };

  return (
    <StyledWrapper>
      <StyledBalanceWrapper>${user.balance}</StyledBalanceWrapper>
      <UserList
        me={user}
        users={users}
        onTransferClick={onTransferClick}
        onAllotClick={onAllotClick}
        onWithdrawClick={onWithdrawClick}
      />

      <Dialog open={transferOpen} onClose={() => setTransferOpen(false)}>
        <StyledTransferWrapper>
          <TextField
            placeholder="金額"
            type={"number"}
            onChange={(e) => {
              e.persist();
              handleTransferAmountChange(Number(e.target.value));
            }}
          />
          <Button disabled={!transferable} onClick={submit}>
            轉帳
          </Button>
        </StyledTransferWrapper>
      </Dialog>
    </StyledWrapper>
  );
});
