const React = require('react');
const hashHistory = require('react-router').hashHistory;

const UserIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick () {
    this.context.router.push('/users/'+ this.props.user.id);
  },

  render(){
    return (
      <li className="user-index-item">
        <div className="profile-photo">
        <img src={this.props.user.img_url} alt={this.props.user.username} onClick={this.handleClick}/></div>
        <h3 onClick={this.handleClick}>{this.props.user.username}</h3>
        <p>Birthday: {this.props.user.birthday}</p>
        <p>Zipcode: {this.props.user.zipcode}</p>
        <p>Looking for: {this.props.user.looking_for}</p>
        <p>Match Percentage: {this.props.user.match_percentage}%</p>
      </li>
    )
  }
})

module.exports = UserIndexItem;