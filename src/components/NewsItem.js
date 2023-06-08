import React from 'react'

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: 0
        }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={!imageUrl ? "https://images.cnbctv18.com/wp-content/uploads/2022/10/SENSEX_NSE_nifty_BSE_Stock-market-1019x573.jpg" : imageUrl}
          className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By <strong>{!author ? "Unknown" : author}</strong> on {new Date(date).toLocaleTimeString()}</small></p>
          <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem

