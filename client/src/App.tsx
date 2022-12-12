import styled from "@emotion/styled";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { IUser } from "../common/user";
import { IRecord } from "../common/record";
import { getUser, getUsers } from "./api/user/user";
import { Layout } from "./components/layout";
import { LoginForm } from "./components/login-form";
import { Main } from "./components/main";
import { createRecord, getRecords } from "./api/record/record";
import { Chatroom } from "./components/chatroom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const StyledRoot = styled("div")(() => ({
  width: "100vw",
  display: "flex",
  overflow: "scroll",
}));

const App = React.memo(() => {
  const [user, setUser] = React.useState<IUser>();
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [records, setRecords] = React.useState<IRecord[]>([]);
  const [chatMode, setChatMode] = React.useState(false);

  React.useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_REACT_APP_WS_URL!);

    socket.onopen = function () {};
    socket.onmessage = async function (msg) {
      getMe();
      fetchResources();
    };
    socket.onerror = function (err) {};
    socket.onclose = function () {};

    return () => {
      socket && socket.close();
    };
  }, []);

  React.useEffect(() => {
    getMe();
    fetchResources();
  }, []);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (user: IUser) => {
    setUser(user);
    await fetchResources();
    localStorage.setItem("userId", user._id);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
    localStorage.removeItem("userId");
  };

  const fetchUsers = async () => {
    const getUsersRes = await getUsers();
    if (getUsersRes.data) {
      setUsers(getUsersRes.data);
    }
  };

  const fetchRecords = async () => {
    const getRecordsRes = await getRecords();
    if (getRecordsRes.data) {
      setRecords(getRecordsRes.data);
    }
  };

  const fetchUser = async (id: string) => {
    const getUserRes = await getUser(id);
    return getUserRes.data;
  };

  const fetchResources = async () => {
    await fetchUsers();
    await fetchRecords();
  };

  const getMe = async () => {
    if (localStorage.getItem("userId")) {
      const me = await fetchUser(localStorage.getItem("userId")!);
      setUser(me);
    }
  };

  const onChatClick = () => setChatMode(!chatMode);

  const onMessageSend = async (msg: string) => {
    if (!user) return;

    await createRecord({ type: "Notify", from: user._id, msg });
  };

  const [container, setContainer] = React.useState<HTMLDivElement>();

  React.useEffect(() => {
    const onResize = () => {
      if (container) {
        const windowsVH = window.innerHeight / 100;
        container.style.setProperty("--vh", windowsVH + "px");
      }
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [container]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StyledRoot
        ref={(element) => {
          setContainer(element ?? undefined);
        }}
        style={{
          height: "calc(var(--vh, 1vh) * 100)", //Safari hack
        }}
      >
        <Layout
          user={user}
          logout={logout}
          chatMode={chatMode}
          onChatClick={onChatClick}
        >
          {user ? (
            !chatMode ? (
              <Main user={user} users={users} />
            ) : (
              <Chatroom
                user={user}
                users={users}
                records={records}
                onMessageSend={onMessageSend}
              />
            )
          ) : (
            <LoginForm onLogin={login} />
          )}
        </Layout>
      </StyledRoot>
    </ThemeProvider>
  );
});

export default App;
