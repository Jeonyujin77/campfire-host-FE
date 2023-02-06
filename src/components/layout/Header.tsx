import styled from "@emotion/styled";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import LoginStatus from "./LoginStatus";

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Campfire</h1>
      <LoginStatus />
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
            <Link to="/keyword-manage">키워드관리</Link>
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
    height: 40px;
    line-height: 40px;
  }
`;

export default Header;
