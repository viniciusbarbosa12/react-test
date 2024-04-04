import "./styles.css";

import { Col, FloatButton, Row } from "antd";
import { useEffect, useState } from "react";

import { IPagination } from "../../interfaces/IPagination";
import { PlusOutlined } from "@ant-design/icons";
import { TableComponent } from "../../components/Table";
import productsService from "../../services/productsService";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const [totalItens, setTotalItens] = useState(0);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 2,
    desc: false,
    order: "name",
  });

  useEffect(() => {
    fetchMyAPI(pagination);
  }, [pagination]);

  async function fetchMyAPI(pagination: IPagination) {
    const { data } = await productsService.getAll(pagination);
    setProducts(data.itens);
    setTotalItens(data.totalItens);
  }

  const changePage = async (tableParams: any) => {
    setPagination({
      page: tableParams.current,
      pageSize: tableParams.pageSize,
      desc: true,
      order: "name",
    });

    await fetchMyAPI({
      page: tableParams.current,
      pageSize: tableParams.pageSize,
      desc: true,
      order: "name",
    });
  };

  return (
    <>
      <Row>
        <FloatButton
          icon={<PlusOutlined />}
          onClick={() => history.push("/products")}
          type="primary"
          style={{ right: 25, height: 50, width: 50 }}
        />
      </Row>
      <Row>
        <Col span={24}>
          <br />
          <TableComponent
            totalItens={totalItens}
            products={products}
            changePage={changePage}
          ></TableComponent>
        </Col>
      </Row>
    </>
  );
};
