const React = require('react');
const FilterActions = require('../actions/filter_actions');

const Filters = React.createClass({
  handleMaxAgeChange(e) {
    FilterActions.updateMaxAge(e.target.value);
  },

  handleMinAgeChange(e) {
    FilterActions.updateMinAge(e.target.value);
  },

  handleMaxDistanceChange(e) {
    FilterActions.updateMaxDistance(e.target.value);
  },

  handleLookingForChange(e) {
    FilterActions.updateLookingFor(e.target.value);
  },

  currentMaxAge() {
    return this.props.filterParams.maxAge;
  },

  currentMinAge() {
    return this.props.filterParams.minAge;
  },

  currentMaxDistance() {
    return this.props.filterParams.maxDistance;
  },

  currentLookingFor() {
    return this.props.filterParams.lookingFor;
  },

  render(){
    return(
      <div className="filter">
        Matches
        <label> between</label>
        <input type="number"
          min="16"
          max="100"
          onChange={this.handleMinAgeChange}
          value={this.currentMinAge()}/>
        <label>and</label>
        <input type="number"
          min="16"
          max="100"
          onChange={this.handleMaxAgeChange}
          value={this.currentMaxAge()}/> years old,
        <label> who are within </label>
        <input type="number"
          min="0"
          max="50"
          onChange={this.handleMaxDistanceChange}
          value={this.currentMaxDistance()}/> miles of me,
        <label> who are looking for </label>
        <select value={this.currentLookingFor()} onChange={this.handleLookingForChange}>
          <option value="Friendship">Friendship</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Either">Either</option>
        </select>
      </div>
    )
  }
});

module.exports = Filters;
