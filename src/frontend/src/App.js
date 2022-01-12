import './App.css';
import {Fragment, useEffect, useState} from "react";
import {deleteApi, getApi} from "./client";
import {Avatar, Badge, Breadcrumb, Button, Empty, Menu, notification, Popconfirm, Radio, Spin, Table, Tag} from "antd";
import {
  LoadingOutlined, PlusCircleOutlined, UsergroupAddOutlined, ProfileTwoTone,
} from '@ant-design/icons';
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import AddPatientDrawer from "./AddPatientDrawer";


function App() {
  const [patients,setPatients] = useState([]);
  const [fetching,setFetching] = useState(true);
  const [openDrawer,setOpenDrawer] = useState(false);
  const closeDrawer = () => setOpenDrawer(false);

  const loader = <LoadingOutlined style={{fontSize:30}} spin/>;

  useEffect( () => {
    loadPatients();
  },[]);

  const loadPatients = () => {
    getApi()
        .then(response => {
          setPatients(response.data.map ( (data, index) => {
            data.key = index+1;
            data.index = index+1;
            return data;
          }));
        })
        .catch(error => console.log(error.message))
        .finally( () => setFetching(false));
  }

  const loadOlderPatients = () => {
    getApi('/older')
        .then(response => {
          setPatients(response.data.map ( (data, index) => {
            data.key = index+1;
            data.index = index+1;
            return data;
          }));
        })
        .catch(error => console.log(error.message))
        .finally( () => setFetching(false));
  }


  const successNotification = () => {
    notification["success"]({
      message: 'deleted successfully',
      description:
          'Record has been deleted from the database',
    });
  }

  function deletePatient(id) {
    deleteApi(`/${id}`)
        .then( res => {
          if (res.status === 200){
            successNotification();
            setPatients(patients.filter( p => p.id !== id))
          }
        }).catch(err => {
          console.log(err);
        });
  }

  const TheAvatar = ({name}) => {
    if (name.length === 0){
      return <Avatar/>
    }
    const slipt = name.split(" ");
    if (slipt.length === 1){
      return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)} ${name.charAt(name.length - 1)}`}</Avatar>
  }

  const columns = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
      render:(text,patient) => <TheAvatar name={patient.fullNames} />
    },
    {
      title: '#',
      dataIndex: 'index',
      key: 'index'

    },
    {
      title: 'Patient Number',
      dataIndex: 'patientNumber',
      key: 'patientNumber',
    },
    {
      title: 'Full name',
      dataIndex: 'fullNames',
      key: 'fullNames',
      sorter:true
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
    },
    {
      title: 'Contact Phone No.',
      dataIndex: 'contactPhoneNumber',
      key: 'contactPhoneNumber',
    },
    {
      title: 'Date of birth.',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text,patient) =>

          <Popconfirm title='Are you sure to delete'
                    placement='topRight'
                    onConfirm={ () => deletePatient(patient.id) }
                    okText='Yes'
                    cancelText='No'>
        <Button>Delete</Button>
      </Popconfirm>
    },
  ];

  const renderPatients = () => {
    if (fetching){
      return <Spin indicator={loader}/>
    }

    if (patients.length <= 0){
      return <Empty>
        <Button type="primary" onClick={setOpenDrawer}>Add First patient record</Button>
      </Empty>
    }
    return <Table
        dataSource={patients}
        columns={columns}
        bordered
    title = {() =>{
          return  <>
            <Button type="primary" htmlType="button" onClick={setOpenDrawer}>
              <PlusCircleOutlined/> Add patient record
            </Button><br/><br/>
            <Tag>Number of Patients</Tag>
            <Badge count={patients.length} className="site-badge-count" />
            </>
    }}
        pagination={{ pageSize:50 }}
        rowKey={ (patient) => patient.id }
    />
  }

  return (
    <Fragment>
      <Layout className="layout" style={{ minHeight: '100vh' }}>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">
              <div className="logo" >
                HCMC
              </div>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />} onClick={loadPatients}>
             Patients
            </Menu.Item>
            <Menu.Item key="3" icon={<ProfileTwoTone />} onClick={loadOlderPatients}>
              Elderly Patients
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Patients</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            { renderPatients() }

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Holy Cross Hospital Management System ©2022 Created by Emmanuel</Footer>
      </Layout>
      <AddPatientDrawer openDrawer={openDrawer} closeDrawer={closeDrawer} loadPatients={loadPatients}/>
    </Fragment>
  );
}

export default App;
