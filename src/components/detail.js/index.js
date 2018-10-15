import React, { Component } from 'react';
import $ from 'jquery';
import { List, Avatar, Button } from 'antd';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      likes: '',
      stars: '',
      comments: '',
      userName: [],
      IsInit: true,
    }
    let self = this;
    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:8000/list/${this.props.id}`,
      success: function (data) {
        self.setState({
          data: data
        });
      },
      error: function (error) {
        console.log('获取文章详情出错', error);
      }
    });

    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:8000/likes/${this.props.id}`,
      success: function (data) {
        self.setState({
          likes: data.like
        });
      },
      error: function (error) {
        console.log('获取文章详情出错', error);
      }
    });

    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:8000/stars/${this.props.id}`,
      success: function (data) {
        self.setState({
          stars: data.star
        });
      },
      error: function (error) {
        console.log('获取文章详情出错', error);
      }
    });
  }

  componentWillMount() {
    let self = this;
    $.ajax({
      method: 'GET',
      url: `http://127.0.0.1:8000/comments?aId=${this.props.id}`,
      success: function (data) {
        self.setState({ comments: data });
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    const { comments, IsInit } = nextState;
    if (comments && IsInit) {
      const self = this;
      let oldState = Array.prototype.slice.call(comments);
      for (let i = 0; i < comments.length; i++) {
        $.ajax({
          method: 'GET',
          url: `http://127.0.0.1:8000/users/${comments[i].commentatorID}`,
          success: function (data) {
            oldState[i].userName = data.name;
            self.setState({ comments: oldState, IsInit: false });
          },
          error: function (error) {
            console.log(error);
          }
        });
      }
    }
  }

  handleLike(id, like) {
    let self = this;
    $.ajax({
      method: 'PUT',
      url: `http://127.0.0.1:8000/likes/${id}`,
      data: { like: parseInt(like) + 1 },
      success: function (data) {
        self.setState({
          likes: data.like
        });
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  handleStar(id, star) {
    let self = this;
    $.ajax({
      method: 'PUT',
      url: `http://127.0.0.1:8000/stars/${id}`,
      data: { star: parseInt(star) + 1 },
      success: function (data) {
        self.setState({
          stars: data.star
        });
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  handlComment() {
    const textarea = document.getElementById('textarea');
    const self = this;
    $.ajax({
      method: 'POST',
      url: 'http://127.0.0.1:8000/comments',
      data: {
        aId: self.state.data.id,
        commentatorID: sessionStorage.id,
        comment: textarea.value
      },
      success: function (data) {
        console.log(data);
        window.location.reload();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  render() {
    const { data, likes, stars, comments } = this.state;
    return (
      <div style={{ padding: 20 }}>
        {
          data ? <div>
            <h1>{data.title}</h1>
            <h6>{data.description}</h6>
            <div>{data.content}</div>
            <p>
              <span onClick={() => { this.handleLike(data.id, likes) }}>点赞数{likes}</span>
              <span onClick={() => { this.handleStar(data.id, stars) }}>收藏数：{stars}</span>
            </p>
            <div>
              {
                sessionStorage.userName ? <div>
                  <textarea id="textarea" placeholder="请输入您的留言" rows="4"></textarea>
                  <Button onClick={() => { this.handlComment() }}>评论</Button>
                </div> : <h6>登录后即可评论留言！</h6>
              }
            </div>
            <div style={{ marginTop: 20 }}>
              {
                comments && (comments.length !== 0) ? <List
                  itemLayout="horizontal"
                  dataSource={comments}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="https://ant.design">评论者：{item.userName}</a>}
                        description={item.comment}
                      />
                    </List.Item>
                  )}
                /> : '暂无评论'
              }
            </div>
          </div> : '没有数据?'
        }
      </div>
    );
  }
}