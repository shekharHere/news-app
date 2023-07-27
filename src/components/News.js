import React, { Component } from 'react';
import NewsItem from './NewsItem';
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner';
import loader from './Spinner.gif';

export class News extends Component {

    defaultImg = "https://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder-800x423.gif";

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            pageSize: 6,
            addPage: 6,
            showNext: false,
            loading: false
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Flash`
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleApiCall = async () => {
        // tarun's apiKey = ee642c8a1b9c47479ce2ea73a274354c
        // my apiKey = 6929820f560f48428b4dcf060ec9fc90
        this.props.updateProgress(10);
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&q=${this.props.queryStr?this.props.queryStr:''}&apiKey=ee642c8a1b9c47479ce2ea73a274354c&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        // this.setState( {
        //     loading: true
        // })
        let data = await fetch(apiUrl);
        this.props.updateProgress(40);
        let parsedData = await data.json();
        this.props.updateProgress(70);
        let totalResults = parsedData.totalResults;
        await this.setState( {
            articles: parsedData.articles,
            showNext: totalResults < (this.state.pageSize * this.state.page),
            loading: false,
            totalResults: totalResults
        } );
        this.props.updateProgress(100);
    }

    handleNext = async () => {
        await this.setState( {
            page: this.state.page + 1
        } );

        this.handleApiCall();
        window.scrollTo(0, 0);
    }

    handlePrev = async () => {
        await this.setState( {
            page: this.state.page - 1
        } );

        this.handleApiCall();
        window.scrollTo(0, 0);
    }

    fetchMoreData = async () => {
        await this.setState({
            pageSize: this.state.pageSize + this.state.addPage
        });
        await this.handleApiCall();
    }

    showMoreData = async () => {
        await this.setState({
            pageSize: this.state.pageSize + this.state.addPage
        });
        this.handleApiCall();
        setTimeout(() => {
            this.scrollToBottom();
        }, 1000);
    }

    scrollToBottom = () =>{ 
        window.scrollTo({ 
          top: document.documentElement.scrollHeight, 
          behavior: 'auto'
          /* you can also use 'auto' behaviour 
             in place of 'smooth' */
        }); 
    }; 

    async componentDidMount() {
        this.handleApiCall();
    }

  render() {
    return (
        <>
        
            {/* Layout with infinite scroll */}

            <h2 className='text-center mb-4 mt-5 pt-5'>News Flash - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                >
                <div className='container my-3'>
                    {<div className='row'>
                        {this.state.articles.map((ele)=>{
                            return <div className='col-lg-4 col-md-6 col-sm-12' key={ele.url}>
                                <NewsItem title={ele.title ? ele.title : ""} desc={ele.description ? ele.description : ""} imgUrl={ele.urlToImage ? ele.urlToImage : this.defaultImg} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                            </div>
                        })}
                    </div>}
                </div>
            </InfiniteScroll>

            {/* Layout end */}

    {/* ------------------------------------ */}

            {/* Layout with prev/next button */}

            {/* <div className='container my-3 mt-5'>
                <h2 className='text-center mb-4'>News Flash - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
                {this.state.loading && <div className='text-center'><img src={loader} alt='loading'/></div>}
                {!this.state.loading && <div className='row'>
                    {this.state.articles.map((ele)=>{
                        return <div className='col-lg-4 col-md-6 col-sm-12' key={ele.url}>
                            <NewsItem title={ele.title ? ele.title : ""} desc={ele.description ? ele.description : ""} imgUrl={ele.urlToImage ? ele.urlToImage : this.defaultImg} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                        </div>
                    })}
                </div>}
                <div className='container d-flex justify-content-between my-5'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrev}> &larr; Previos </button>
                    <button disabled={this.state.showNext} type="button" className="btn btn-primary" onClick={this.handleNext}> Next &rarr; </button>
                </div>
            </div> */}

            {/* Layout end */}


    {/* ------------------------------------ */}


            {/* Layout with show more button */}

            {/* <div className='container my-3 mt-5'>
                <h2 className='text-center mb-4'>News Flash - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
                {this.state.loading && <div className='text-center'><img src={loader} alt='loading'/></div>}
                {!this.state.loading && <div className='row' ref={el => { this.el = el; }}>
                    {this.state.articles.map((ele)=>{
                        return <div className='col-lg-4 col-md-6 col-sm-12' key={ele.url}>
                            <NewsItem title={ele.title ? ele.title : ""} desc={ele.description ? ele.description : ""} imgUrl={ele.urlToImage ? ele.urlToImage : this.defaultImg} url={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
                        </div>
                    })}
                </div>}
                <div className='container text-center my-5'>
                    <button disabled={this.state.showNext} type="button" className="btn btn-primary" onClick={this.showMoreData}> Show More </button>
                </div>
            </div> */}

            {/* Layout end */}
        
        </>
    );
  }
}

export default News;
