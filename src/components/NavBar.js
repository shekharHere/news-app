import React, { useState } from 'react';
import News from './News';
import LoadingBar from 'react-top-loading-bar'
import {
    Routes,
    Route,
    Link
  } from "react-router-dom";

function NavBar() {

    let [ queryStr, setQueryStr ] = useState('');
    let [ progress, setProgress ] = useState(0);
    // let [ linkStr, setLinkStr ] = useState('');

    const updateProgress = (prog) => {
        setProgress(prog);
    }

    const handleInput = async () => {
        let searchText = document.getElementById('search-text');
        await setQueryStr(searchText.value);
    }

    // const handleClick = async () => {
    //     await setLinkStr(queryStr);
    //     console.log(linkStr);
    // }

    return (
    <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/general">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/general">Top-Headlines</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/sports'>Sports</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entertainment">Entertainment</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/business">Business</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/science">Science</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/technology">Technology</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/health">Health</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Select Country
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" id='search-text' placeholder="Search" aria-label="Search" onChange={handleInput}/>
                        <Link className="nav-link" to={`/${queryStr}`}><button className="btn btn-outline-success">Search</button></Link>
                    </form>
                </div>
            </div>
        </nav> 
        <LoadingBar
            color='#f11946'
            height={4}
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
            <Route exact path='/science' element={<News updateProgress={updateProgress} key='science' country={'in'} category={'science'}/>}></Route>
            <Route exact path='/health' element={<News updateProgress={updateProgress} key='health' country={'in'} category={'health'}/>}></Route>
            <Route exact path='/technology' element={<News updateProgress={updateProgress} key='technology' country={'in'} category={'technology'}/>}></Route>
            <Route exact path='/business' element={<News updateProgress={updateProgress} key='business' country={'in'} category={'business'}/>}></Route>
            <Route exact path='/entertainment' element={<News updateProgress={updateProgress} key='entertainment' country={'in'} category={'entertainment'}/>}></Route>
            <Route exact path='/sports' element={<News updateProgress={updateProgress} key='sports' country={'in'} category={'sports'}/>}></Route>
            <Route exact path='/general' element={<News updateProgress={updateProgress} key='general' country={'in'} category={'general'}/>}></Route>
            <Route exact path={`/${queryStr}`} element={<News updateProgress={updateProgress} key='search' country={'in'} category={''} queryStr={queryStr}/>}></Route>
        </Routes>
        
    </>
    );
}

export default NavBar;
