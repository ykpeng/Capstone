const React = require('react');
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const LoginForm = require('../components/login_form');
const UserStore = require('../stores/user_store');
const UserActions = require('../actions/user_actions');

const App = React.createClass({
  getInitialState(){
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount() {
    this.sessionListener = SessionStore.addListener(this.updateUser);
  },

  updateUser(){
    this.setState({ currentUser: SessionStore.currentUser()});
  },

  handleLogOut(e){
    e.preventDefault();
    SessionActions.logout();
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  render(){
    const currentUser = this.state.currentUser;
    return (
      <div>
        <header className="header">
          <ul className="header-list1">
            <li><Link to="/" className="icon"><i className="fa fa-users" aria-hidden="true"></i>
</Link></li>
            <li><Link to="/test" className="icon"><i className="fa fa-flask" aria-hidden="true"></i>
</Link></li>
            <li><a className="link" href="https://www.linkedin.com/in/ykpeng89">About</a></li>
          </ul>

          <ul className="header-list2">
            <li>
              <Link to={`/users/${currentUser.id}`}><div className="user-icon"><img src={currentUser.img_url} alt={currentUser.username}/></div>
              </Link>
            </li>

            <li >
              <Link to="/conversations" className="icon"><i className="fa fa-envelope-o" aria-hidden="true"></i>
              </Link>
            </li>

            <li>
              <button onClick={ this.handleLogOut } className="link">Log out</button>
            </li>
          </ul>
        </header>

        {this.props.children}
      </div>
    )
  }
});

module.exports = App;
