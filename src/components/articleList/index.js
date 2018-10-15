import React, { Component } from 'react';
import { List, Icon } from 'antd';
import $ from 'jquery';

class IconText extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    }
  }

  componentWillMount() {
    this.props.text && this.setState({
      text: this.props.text,
    });
  }

  onClick(id, num) {
    if (this.props.onClick) {
      this.setState({ text: num });
      this.props.onClick(id, num);
    }
  }

  render() {
    const { id, type } = this.props;
    const { text } = this.state;
    return (
      <span onClick={() => { this.onClick(id, parseInt(text) + 1) }}>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
  }
}

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('4', nextProps);
    const { data, likes, stars } = nextProps;
    let arr = [];
    if (data && likes && stars) {
      for (let i = 0; i < data.length; i++) {
        const t = Object.assign({}, data[i], likes[i], stars[i]);
        arr.push(t);
      }
    }
    data && likes && stars && this.setState({ dataSource: arr });
  }

  handleItem(id) {
    console.log(id);
    window.location.href = `http://localhost:3000/blog/index?id=${id}`;
  }

  handleStar(id, num) {
    console.log(num);
    // const self = this;
    $.ajax({
      method: 'PUT',
      url: `http://127.0.0.1:8000/stars/${id}`,
      data: { star: num },
      success: function (data) {
        console.log('p2', data);
      },
      error: function (error) {
        console.log('p3', error, error.status);
        return error.status;
      }
    });
  }

  handleLike(id, num) {
    $.ajax({
      method: 'PUT',
      url: `http://127.0.0.1:8000/likes/${id}`,
      data: { like: num },
      success: function (data) {
        console.log('l2', data);
      },
      error: function (error) {
        console.log('l3', error, error.status);
        return error.status;
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
              actions={[<IconText onClick={(id, num) => { this.handleStar(id, num) }} id={item.id} type="star-o" text={item.star} />,
              <IconText onClick={(id, num) => { this.handleLike(id, num) }} id={item.id} type="like-o" text={item.like} />]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
            >
              <p className="article-tit">{item.title}</p>
              <div onClick={() => { this.handleItem(item.id) }} className="article-desc">{item.content}</div>
            </List.Item>
          )}
        />
    );
  }
}