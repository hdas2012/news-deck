import React from "react";
import {
  getLocalStorage,
  setLocalStorage,
  removeItemFromArr
} from "../../common/Utility";

export default class VoteComponent extends React.Component {
  toggleVote() {
    let votes = getLocalStorage("votes", []);
    if (this.props.news.upvoted) {
      votes = removeItemFromArr(votes, this.props.news.objectID);
      setLocalStorage("votes", votes);
      this.props.onToggleVote(this.props.news.objectID, -1);
    } else {
      votes.push(this.props.news.objectID);
      setLocalStorage("votes", votes);
      this.props.onToggleVote(this.props.news.objectID, 1);
    }
  }
  render() {
    let pointsCount = this.props.news.points;
    return (
      <React.Fragment>
        <td>
          {pointsCount ? pointsCount : 0}
          <span
            className={
              this.props.news.upvoted ? "triangle upvoted" : "triangle"
            }
            onClick={() => this.toggleVote()}
          >
            ▲
          </span>
        </td>
      </React.Fragment>
    );
  }
}
