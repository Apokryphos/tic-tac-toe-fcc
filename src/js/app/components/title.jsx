const React = require('react');

class Title extends React.Component {
  render() {
    return (
      <div className="title-container">
        <span className="title jumble-left color-text-1">T</span>
        <span className="title color-text-2">I</span>
        <span className="title jumble-right color-text-3">C</span>
        <span className="title jumble-left color-text-4">-</span>
        <span className="title jumble-left color-text-5">T</span>
        <span className="title color-text-1">A</span>
        <span className="title jumble-right color-text-2">C</span>
        <span className="title jumble-right color-text-3">-</span>
        <span className="title jumble-left color-text-4">T</span>
        <span className="title color-text-5">O</span>
        <span className="title jumble-right color-text-1">E</span>
      </div>
    );
  }
}

module.exports = Title;
