import React from "react";
import {
  getNewsApiUrl,
  getHostFromUrl,
  timeSince,
  getLocalStorage,
  setLocalStorage
} from "../../common/Utility";
import GraphComponent from "../vote/GraphComponent";
import VoteComponent from "../vote/VoteComponent";

export default class NewsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, news: [] };
  }
  componentDidMount() {
    this.fetchNews();
  }
  fetchNews() {
    let newsType = this.props.match.params.newsType;
    newsType = !newsType ? "top" : newsType;

    fetch(getNewsApiUrl(newsType, this.state.page))
      .then(res => res.json())
      .then(result => {
        this.setState({ news: this.applyUserActions(result.hits) });
      });
  }
  applyUserActions(news) {
    let votes = getLocalStorage("votes", []);
    let hidden = getLocalStorage("hidden", []);
    news.forEach(item => {
      if (votes.indexOf(item.objectID) >= 0) {
        item.upvoted = true;
        item.points++;
      }
      if (hidden.indexOf(item.objectID) >= 0) {
        item.hidden = true;
      }
    });
    return news;
  }
  getStoryTitle(news) {
    return news.title
      ? news.title
      : news.story_title
      ? news.story_title
      : news.story_text;
  }
  getStoryUrl(news) {
    return news.title ? news.url : news.story_url;
  }
  getStoryUrlHostName(news) {
    return news.url ? getHostFromUrl(news.url) : getHostFromUrl(news.story_url);
  }
  loadMore() {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchNews();
    });
  }
  onToggleVote(id, fac) {
    debugger;
    let news = [...this.state.news];
    let filtered = news.filter(item => {
      return item.objectID === id;
    });
    filtered[0].upvoted = fac === 1 ? true : false;
    filtered[0].points = filtered[0].points + fac;
    this.setState({ news: news });
  }
  hideNews(item, index) {
    debugger;
    let hidden = getLocalStorage("hidden", []);
    hidden.push(item.objectID);
    setLocalStorage("hidden", hidden);
    let news = [...this.state.news];
    news[index].hidden = true;
    this.setState({ news: news });
  }
  render() {
    return (
      <div className="container mb-4">
        <table className="table border news-table table-sm table-striped mt-3">
          <tbody>
            {this.state.news.map((news, i) => {
              let storyUrlHostName = this.getStoryUrlHostName(news);
              let storyTitle = this.getStoryTitle(news);
              return (
                !news.hidden && (
                  <tr key={i}>
                    <td>
                      <img
                        src="/img/comment.png"
                        alt="Comment"
                        title="Comments"
                        className="mr-2"
                      />
                      {!news.num_comments ? 0 : news.num_comments}
                    </td>
                    <VoteComponent
                      news={news}
                      onToggleVote={(id, fac) => this.onToggleVote(id, fac)}
                    />
                    <td>
                      <a href={this.getStoryUrl(news)} className="news-title">
                        {storyTitle}
                      </a>
                      <span className="small">
                        {storyUrlHostName && (
                          <span className="text-secondary ml-1">
                            (
                            <a
                              className="text-secondary"
                              href={`https://news.ycombinator.com/from?site=${storyUrlHostName}`}
                            >
                              {storyUrlHostName}
                            </a>
                            )
                          </span>
                        )}
                        <span className="small text-secondary"> by </span>
                        <a
                          className="text-dark"
                          href={`https://news.ycombinator.com/user?id=${
                            news.author
                          }`}
                        >
                          {news.author}
                        </a>{" "}
                        <a
                          className="text-secondary"
                          href={`https://news.ycombinator.com/item?id=${
                            news.objectID
                          }`}
                        >
                          {timeSince(news.created_at)}
                        </a>
                        <span className="text-secondary"> [</span>
                        <span>
                          {" "}
                          <span
                            className="text-dark underline"
                            onClick={() => this.hideNews(news, i)}
                          >
                            hide
                          </span>{" "}
                        </span>
                        <span className="text-secondary"> ]</span>
                      </span>
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
        {this.state.news.length > 0 && (
          <React.Fragment>
            <span className="more-news" onClick={() => this.loadMore()}>
              More
            </span>
            <GraphComponent news={this.state.news} />
          </React.Fragment>
        )}
        
         
      </div>
    );
  }
}
