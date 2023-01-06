import { memo } from "react";
import styled from "@emotion/styled";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  // 로그아웃
  const logout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <HeaderWrapper>
      <h1>Camp-Fire</h1>
      <LoginStatus>
        <span>호스트님이 로그인 중입니다.</span>
        <Button size="small" className="logout" onClick={logout}>
          로그아웃
        </Button>
      </LoginStatus>
      <MenuList>
        <MenuItem>
          <ListItemText>
            <Link to="/reserve-manage">예약관리</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>
            <Link to="/camp-manage">캠핑장관리</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>
            <Link to="/site-manage">사이트관리</Link>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>
            <Link to="/hostpage">프로필편집</Link>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: whitesmoke;
  h1 {
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #ff7a50;
    color: #fff;
    text-align: center;
    font-size: 25px;
  }
  a {
    display: inline-block;
    width: 100%;
  }
`;

const LoginStatus = styled.div`
  padding: 20px 20px 40px 20px;
  font-size: 13px;

  .logout {
    padding-left: 10px;
    color: tomato;
  }
`;
export default memo(Header);
