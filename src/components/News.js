import React, {useEffect,useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=4bfa77c1a9ee4f75b6058063e6bbbe12&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        setLoading(true);
        let parsedData = await data.json()
        console.log(parsedData);
        
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false);
    }

    useEffect(() => {
        document.title = `${capitaliseFirstLetter(props.category)} - News Wala`;
        updateNews();
    }, [])   

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?&country=${props.country}&category=${props.category}&apiKey=4bfa77c1a9ee4f75b6058063e6bbbe12&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

        return (
            <>
                <h1 className='text-center' style={{ margin: '34px 0px',marginTop: '90px' }}>News Wala - Top {capitaliseFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}

export default News


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}