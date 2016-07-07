const React = require('react');
const ConversationIndexItem = require('./conversation_index_item');
const ConversationStore = require('../stores/conversation_store');
const ConversationActions = require('../actions/conversation_actions');
const Link = require('react-router').Link;

const ConversationIndex = React.createClass({
  getInitialState(){
    return { conversations: [] }
  },

  componentDidMount(){
    this.listener = ConversationStore.addListener(this.handleChange);
    ConversationActions.fetchConversations();
  },

  handleChange(){
    this.setState({ conversations: ConversationStore.all() })
  },

  componentWillUnmount(){
    this.listener.remove();
  },

  render(){
    let sortedConvos = this.state.conversations.sort((a, b)=>{
      if (b.last_message.created_at < a.last_message.created_at) {
        return -1;
      } else if (b.last_message.created_at === a.last_message.created_at) {
        return 0;
      } else {
        return 1;
      }
    })
    return(
      <div className="content">
        <div className="content-vertical">
          <h3>Messages</h3>
          <ul className="conversation-index">
            {sortedConvos.map((conversation)=>{
              return <Link to={`/conversations/${conversation.id}`} key={conversation.id}><ConversationIndexItem last_message={conversation.last_message} id={conversation.id}/></Link>
            })}
          </ul>
        </div>
      </div>
    )
  }
})

module.exports = ConversationIndex;
