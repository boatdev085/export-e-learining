import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Transfer, Button, Breadcrumb, Select, Form } from "antd";
const { Option } = Select;
function App() {
  const [form] = Form.useForm();
  const [useDataELearning, setDataELearning] = useState<any[]>([]);
  const [useTargetKeys, setTargetKeys] = useState<any[]>([]);
  const handleChange = (targetKeys: any) => {
    console.log("targetKeys", targetKeys);

    setTargetKeys(targetKeys);
  };

  const fetchElearningField = async () => {
    const response = await fetch("/api/elearning").then((res) => res.json());
    setDataELearning(response);
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
      <Form {...layout} form={form} style={{ width: "70%" }}>
        <Form.Item label="ประเภท" name="type">
          <Select
            placeholder="กรุณาเลือกประเภท"
            style={{ width: 200 }}
            // onChange={handleChange}
          >
            <Option value="e-learning">
              E-Learning Upload Template (report)
            </Option>

            <Option value="การศึกษาพนักงาน">การศึกษาพนักงาน</Option>
          </Select>
        </Form.Item>
        <Form.Item label="เลือกข้อมูลที่ต้องการ" name="select">
          <Transfer
            dataSource={useDataELearning}
            className={"transfer-test"}
            targetKeys={useTargetKeys}
            onChange={handleChange}
            onSelectChange={(e) => console.log("e", e)}
            render={(item: any) => item.title}
            titles={["ข้อมูลที่ให้เลือก", "ข้อมูลที่เลือก"]}
            // operationStyle={{ color: "blue" }}
            selectAllLabels={[
              `${useDataELearning.length} ชิ้น`,
              `${useTargetKeys.length} ชิ้น`,
            ]}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: "16px" }}
          >
            ส่งออก
          </Button>
          <Button type="default" htmlType="button">
            ยกเลิก
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
