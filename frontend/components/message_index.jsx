const React = require('react');
const MessageActions = require('../actions/message_actions');
const MessageStore = require('../stores/message_store');
const MessageIndexItem = require('./message_index_item');
const SessionStore = require('../stores/session_store');
const MessageForm = require('./message_form');
const Link = require('react-router').Link;

const MessageIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return { messages: [] };
  },

  componentDidMount(){
    this.listener = MessageStore.addListener(this.handleChange);
    MessageActions.fetchMessages(parseInt(this.props.params.conversationId));
    // subscription code
    this.pusher = new Pusher('367b3c3c9c72c74cbe22', {
      encrypted: true
    });

    const channel = this.pusher.subscribe('conversation_' + this.props.params.conversationId);
    channel.bind('message_sent', function(data) {
      MessageActions.fetchMessages(parseInt(this.props.params.conversationId));
    }.bind(this));
  },

  componentWillReceiveProps(newProps) {
    MessageActions.fetchMessages(parseInt(newProps.params.conversationId));
  },

  handleChange(){
    this.setState({ messages: MessageStore.all() });
  },

  componentWillUnmount(){
    this.listener.remove();
    this.pusher.unsubscribe('conversation_' + this.props.params.conversationId);
  },

  render(){
    if (this.state.messages.length === 0) {
      return <div></div>;
    }
    let firstMessage = this.state.messages["0"]
    let other_user = firstMessage.sender;
    if (other_user.id === SessionStore.currentUser().id) {
      other_user = firstMessage.receiver;
    };
    if (firstMessage.sender.id !== SessionStore.currentUser().id && firstMessage.receiver.id !== SessionStore.currentUser().id) {
      return <div></div>;
    }
    return(
      <div className="content-vertical">
        <Link to={`/conversations`}><h5 className="message-nav">MESSAGES</h5></Link>
        <Link to={`/users/${other_user.id}`}><div className="messages-header">
          <div className="messages-header-left">
            <div className="message-photo">
              <img src={other_user.img_url} alt={other_user.username} onClick={this.goToOther}/>
            </div>
            <div>
              <h5>{other_user.username}</h5>
              <div>{other_user.age} ・ {other_user.city}, {other_user.state} ・ Looking for {other_user.looking_for.toLowerCase()} ・ {other_user.match_percentage}% Match</div>
            </div>
          </div>
        </div></Link>

        <ul className="messages">
          {this.state.messages.map((message)=>{
            return <MessageIndexItem message={message} key={message.id}/>
          })}
          <MessageForm receiver_id={other_user.id} conversation_id={firstMessage.conversation_id}/>
        </ul>

      </div>
    );
  }
});

module.exports = MessageIndex;
