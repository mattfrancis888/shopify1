import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
const Home: React.FC<{}> = () => {
    const [medias, setMedias] = useState<any>(null);
    useEffect(() => {
        // const LINK = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=avengers`;
        // axios
        //     .get(LINK)
        //     .then((response) => {
        //         // handle success
        //         // console.log(response.data.Search.slice(0, 6));
        //         setMedias(response.data.Search.slice(0, 5));
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         setMedias([]);
        //         console.log("API ERROR:", error);
        //     });
    }, []);
    const renderSearchMedias = () => {
        <React.Fragment>
            {medias.map((media: any, index: number) => {
                return (
                    <div key={index} className="nomineeMedia">
                        <img src={media.Poster} alt="poster" />
                        <div className="nomineeMediaTextWrap">
                            <h1>{media.Title}</h1>
                            <p>{media.Type}</p>
                        </div>
                    </div>
                );
            })}
        </React.Fragment>;
    };
    const renderMedias = () => {
        if (medias) {
            return (
                <React.Fragment>
                    {medias.map((media: any, index: number) => {
                        return (
                            <div key={index} className="nomineeMedia">
                                <img src={media.Poster} alt="poster" />
                                <div className="nomineeMediaTextWrap">
                                    <h1>{media.Title}</h1>
                                    <p>{media.Type}</p>
                                </div>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }
    };
    const searchKeyword = () => {};
    return (
        <React.Fragment>
            <div className="introBanner">
                <img
                    className="introBannerImage"
                    alt=""
                    src="https://allears.net/wp-content/uploads/2020/10/Avengers-Infinity-War-Poster.jpg"
                ></img>
                <div className="introBannerTextWrap">
                    <h1 className="introBannerTitle">2021 Nominees</h1>
                    <p className="introBannerTitleDesc">
                        Search titles on OMDB and nominate your top 5.
                    </p>
                </div>
                <div className="modalFade"></div>
                <img
                    className="ironManImage"
                    alt=""
                    src="https://purepng.com/public/uploads/large/purepng.com-ironmanironmansuperheromarvel-comicscharactermarvel-studiosrobert-downey-jrtony-stark-1701528612052n7gmm.png"
                ></img>
            </div>
            <div className="searchAndNomineeSection">
                <Searchbar />

                <h1 className="searchAndNomineeTitle">Nominees</h1>
                <div className="nomineeMediaContainer">{renderMedias()}</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
