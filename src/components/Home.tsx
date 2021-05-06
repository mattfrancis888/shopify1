import React, { useState, useEffect } from "react";
const Home: React.FC<{}> = () => {
    return (
        <div>
            <h1 className="nomineeTitle">Nominees</h1>
            <div className="nomineeMediaContainer">
                <div className="nomineeMedia">
                    <img src="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" />
                    <div className="nomineeMediaTextWrap">
                        <h1>Title</h1>
                        <p>Desc</p>
                    </div>
                </div>
                <div className="nomineeMedia">
                    <img src="https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" />
                    <div className="nomineeMediaTextWrap">
                        <h1>The Last Of Us</h1>
                        <p>Movie</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
