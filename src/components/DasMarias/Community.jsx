// import { useERC20Balances } from "react-moralis";
import { Skeleton, Table, Image } from "antd";
import { useEffect, useState } from "react";

import PROJECTS_MOCK from "mocks/ProjectsMock";

function ERC20Balance() {
  const [projects, setProjects] = useState([]);
  // const { Moralis } = useMoralis();

  useEffect(() => {
    setProjects(PROJECTS_MOCK);
  }, [setProjects]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Status", dataIndex: "status", key: "status" },
    Table.EXPAND_COLUMN,
  ];

  return (
    <div style={{ width: "450px", padding: "15px", textAlign: "center" }}>
      <Image width="100%" preview={false} src="mocks/vote1.png" />
      <Image width="100%" preview={false} src="mocks/vote2.png" />
      <br />
      <br />
      <h1>📰 Projetos</h1>
      <Skeleton loading={!projects}>
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
      </Skeleton>
      <Image width="100%" preview={false} src="mocks/vote3.png" />
    </div>
  );
}
export default ERC20Balance;
