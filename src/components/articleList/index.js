import React, { Component } from 'react';
import $ from 'jquery';
import { List, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ''
    }
    const self = this;
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/list',
      success: function (data) {
        data && self.setState({ dataSource: data });
      },
      error: function (error) {
        alert(error);
        console.log('56', error)
      }
    });
  }

  render() {
    const { dataSource } = this.state;
    return (
      !dataSource ? '暂时没有数据' :
        <List
          style={{ padding: '20px' }}
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={dataSource}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <p className="article-tit">{item.title}</p>
              <div className="article-desc">{item.content}</div>
            </List.Item>
          )}
        />
    );
  }
}