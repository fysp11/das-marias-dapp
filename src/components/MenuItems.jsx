import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems({ onSelect }) {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="vertical"
      style={{
        // display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        // justifyContent: "center",
      }}
      onSelect={onSelect}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="community">
        <NavLink to="/community">🌱 Comunidade</NavLink>
      </Menu.Item>
      <Menu.Item key="mybank">
        <NavLink to="/mybank">💰 Minha Conta</NavLink>
      </Menu.Item>
      <Menu.Item key="/stats">
        <NavLink to="/stats">🔎 Stats</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
