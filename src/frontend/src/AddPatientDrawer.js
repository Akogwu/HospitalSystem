import {useRef, useState} from "react";
import {Button, Col, DatePicker, Drawer, Form, Input, notification, Row, Select, Space} from "antd";
import {postApi} from "./client";

const AddPatientDrawer = ({openDrawer,closeDrawer,loadPatients}) => {
    const formRef = useRef(null);
    const [sending,setSending] = useState(false);
    const dateFormat = 'YYYY-MM-DD';

    const successNotification = () => {
        notification["success"]({
            message: 'Successful',
            description:
                'Record added to the database',
        });
    }

    const onFinish = (values: any) => {
        setSending(true);
        const data = {
            "patientNumber": values.patientNumber,
            "isAnOutPatient": values.isAnOutPatient,
            "fullNames": values.fullNames,
            "emailAddress": values.emailAddress,
            "contactPhoneNumber": values.contactPhoneNumber,
            "dateOfBirth": values.dateOfBirth
        }

        postApi('',data)
            .then( response => {
                if (response.status === 200){
                    loadPatients();
                    successNotification();
                    closeDrawer();
                }
            }

        ).catch(error => console.log(error))
            .finally(() => setSending(false));

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



    return (
        <>
            <Drawer
                title="Create a new patient record"
                width={720}
                onClose={closeDrawer}
                visible={openDrawer}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={closeDrawer}>Cancel</Button>
                    </Space>
                }
            >
                <Form layout="vertical" hideRequiredMark
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      ref={formRef}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="patientNumber"
                                label="Patient Number"
                                rules={[{ required: true, message: 'Please enter patient number' }]}>
                                <Input placeholder="Please enter patient number" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="fullNames"
                                label="Full Name"
                                id="fullNames"
                                rules={[{ required: true, message: 'Please enter full name' }]}
                            >
                                <Input placeholder="Please enter full name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="isAnOutPatient"
                                label="Out Patient?"
                                rules={[{ required: true, message: 'Please select' }]}
                            >
                                <Select placeholder="Please select">
                                    <Select.Option value="true">Yes</Select.Option>
                                    <Select.Option value="false">No</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="emailAddress"
                                label="Email address"
                                rules={[{ required: true, message: 'Please enter email address' }]}
                            >
                                <Input placeholder="Please enter email address"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>

                            <Form.Item
                                name="contactPhoneNumber"
                                label="Contact number"
                                rules={[{ required: true, message: 'Please enter contact number' }]}
                            >
                                <Input placeholder="Please enter contact number"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateOfBirth"
                                label="Date Of Birth"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >

                                <DatePicker style={{ width: '100%' }}  format={dateFormat}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Button type="primary" htmlType="submit"  disabled={sending}>
                            {sending? 'Please wait ... ': 'Submit'}
                        </Button>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default AddPatientDrawer;