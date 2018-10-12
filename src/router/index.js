import React from 'react';
export default class IndexRouter extends React.Component {
  // this.props.match
  // this.props.location
  render() {
    let defaultCon = '';
    console.log(this.props.match, this.props.location);
    const category = this.props.location.search.split('=')[1];
    category && console.log(category);
    if(category === 'living'){
      // window.location.href = 'http://localhost:3000/blog/tuya';
      window.open('http://localhost:3000/blog/tuya');
    }
    switch (this.props.match.params.menu) {
      case 'index':
        defaultCon = '首页';
        break;
      case 'tuya':
        defaultCon = '涂鸦';
        break;
      case 'shudong':
        defaultCon = '树洞';
        break;
      default:
        defaultCon = '404 not found';
        break;
    }
    return defaultCon;
  }
}