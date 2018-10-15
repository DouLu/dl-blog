import React, { Component } from 'react';
import $ from 'jquery';

import ArticleList from '../components/articleList';

export default class GetArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      likes: '',
      stars: '',
    }
    this._getArticleList();
    this._getArticleLikes();
    this._getArticleStars();
  }

  _getArticleList() {
    const self = this;
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/list?_sort=id&_order=asc',
      success: function (data) {
        console.log('2');
        self.setState({ data: data });
      },
      error: function (error) {
        console.log('3', error, error.status);
        return error.status;
      }
    });
    console.log('1');
  }

  _getArticleLikes() {
    const self = this;
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/likes?_sort=id&_order=asc',
      success: function (data) {
        self.setState({ likes: data });
      },
      error: function (error) {
        console.log('3', error, error.status);
        return error.status;
      }
    });
  }

  _getArticleStars() {
    const self = this;
    $.ajax({
      method: 'GET',
      url: 'http://127.0.0.1:8000/stars?_sort=id&_order=asc',
      success: function (data) {
        self.setState({ stars: data });
      },
      error: function (error) {
        console.log('3', error, error.status);
        return error.status;
      }
    });
  }

  render() {
    return (
      <ArticleList {...this.state} />
    );
  }
}