import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {

    let { title, desc, imgUrl, url, author, date, source } = this.props;
    return (
      <>
      <div className="card" style={{margin: "8px"}}>
        <img src={imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "80%", zIndex: "1", width: "50%"}}>
                {source}
            </span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : "Unknown"} on {(new Date(date)).toDateString()}</small></p>
            <a href={url} target='_blank' className="btn btn-primary">Read More</a>
        </div>
    </div>
    </>
    );
  }
}

export default NewsItem;
