import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Transfer, Button, Breadcrumb, Select, Form } from "antd";
const { Option } = Select;
function App() {
  const [form] = Form.useForm();
  const [useLoad, setLoad] = useState(false);
  const [useBeforeSelect, setBeforeSelect] = useState<any[]>([]);
  const [useDataELearning, setDataELearning] = useState<any[]>([]);
  const [useTargetKeys, setTargetKeys] = useState<any[]>([]);
  const handleChange = (targetKeys: any) => {
    setTargetKeys(targetKeys);
  };
  const handleChangeSelect = (e: any) => {
    if (e === "e-learning") {
      setBeforeSelect(useDataELearning);
    } else {
      setBeforeSelect([]);
    }
  };

  const fetchElearningField = async () => {
    const response = await fetch("/api/elearning").then((res) => res.json());
    setDataELearning(response);
  };
  const handleConfirmExport = async () => {
    setLoad(true);
    const mapField = useTargetKeys.map((item) => {
      const findKey = useDataELearning.find((f) => f.key === item);

      return findKey.title;
    });
    const response = await fetch("/api/elearning/export", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: mapField }),
    }).then(async (res) => await res.json());
    if (response) {
      window.open(response);
    }
    setLoad(false);
  };
  useEffect(() => {
    fetchElearningField();
  }, []);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  return (
    <div className="App">
      <h1 className="title">ส่งออกข้อมูล</h1>
      <div className="breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
          <Breadcrumb.Item>ผู้ดูแลระบบ</Breadcrumb.Item>
          <Breadcrumb.Item>ส่งออกข้อมูล</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        {...layout}
        form={form}
        style={{ width: "70%" }}
        onFinish={handleConfirmExport}
      >
        <Form.Item label="ประเภท" name="type">
          <Select
            placeholder="กรุณาเลือกประเภท"
            style={{ width: 200 }}
            onChange={handleChangeSelect}
          >
            <Option value="e-learning">
              E-Learning Upload Template (report)
            </Option>

            <Option value="การศึกษาพนักงาน">การศึกษาพนักงาน</Option>
          </Select>
        </Form.Item>
        <Form.Item label="เลือกข้อมูลที่ต้องการ" name="select">
          <Transfer
            dataSource={useBeforeSelect}
            className={"transfer-test"}
            targetKeys={useTargetKeys}
            onChange={handleChange}
            render={(item: any) => item.title}
            titles={["ข้อมูลที่ให้เลือก", "ข้อมูลที่เลือก"]}
            selectAllLabels={[
              `${useBeforeSelect.length - useTargetKeys.length} ชิ้น`,
              `${useTargetKeys.length} ชิ้น`,
            ]}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "16px" }}
            disabled={
              useBeforeSelect.length === 0 || useTargetKeys.length === 0
            }
            loading={useLoad}
          >
            ส่งออก
          </Button>
          <Button
            onClick={() => setTargetKeys([])}
            type="default"
            htmlType="button"
          >
            ยกเลิก
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
