// import { useERC20Balances } from "react-moralis";
import { Skeleton, Table, Image } from "antd";
import { useEffect, useState } from "react";

import PROJECTS_MOCK from "mocks/ProjectsMock";

function ERC20Balance() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { Moralis } = useMoralis();

  useEffect(() => {
    setProjects(PROJECTS_MOCK);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setProjects]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    Table.EXPAND_COLUMN,
  ];

  return (
    <div style={{ width: "450px", padding: "15px", textAlign: "center" }}>
      <h1 style={{ padding: "15px" }}>🌱 Comunidade</h1>
      <Skeleton loading={loading}>
        <Image width="100%" preview={false} src="mocks/vote1.png" />
        <Image width="100%" preview={false} src="mocks/vote2.png" />
        <br />
        <br />
        <h1>📰 Projetos</h1>
          <Table
            dataSource={projects}
            rowSelection={{}}
            columns={columns}
            rowKey={(project) => project.id}
            expandable={{
              expandedRowRender: (project) => {
                <>
                  <p style={{ margin: 0 }}>Tipo: {project.type}</p>
                  <p style={{ margin: 0 }}>Lugar: {project.place}</p>
                </>;
              },
            }}
            />
        <Image width="100%" preview={false} src="mocks/vote3.png" />
      </Skeleton>
    </div>
  );
}
export default ERC20Balance;
