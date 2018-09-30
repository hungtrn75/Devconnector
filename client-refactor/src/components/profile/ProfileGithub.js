import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "5701372ccbdc7ae91d6e",
      clientSecret: "444e8994d3c1c926721c666c4b12c195b839030c",
      count: 5,
      sort: "created:asc",
      repos: []
    };
  }
  componentWillUnmount() {
    this._mounted = false;
  }
  componentDidMount = async () => {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this._mounted) this.setState({ repos: data });
      })
      .catch(err => console.log(err));
  };
  render() {
    const { repos } = this.state;
    let reposItem = null;
    if (repos.length > 0) {
      reposItem = repos.map(repo => (
        <div className="card card-body mb-2" key={repo.id}>
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link className="text-info" to={repo.html_url} target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watcher_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    }
    return (
      // <!-- Profile Github -->
      <React.Fragment>
        {reposItem && (
          <div ref="myRef">
            <hr />
            <h3 className="mb-4">Latest Github Repos</h3>
            {reposItem}
          </div>
        )}
      </React.Fragment>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
