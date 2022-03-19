import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="community">
        <NavLink to="/community">🌱 Comunidade</NavLink>
      </Menu.Item>
      <Menu.Item key="mybank">
        <NavLink to="/mybank">💰 Minha Conta</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">🔎 Nosso Banco</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
