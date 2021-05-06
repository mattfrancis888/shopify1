import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
const Home: React.FC<{}> = () => {
    const [medias, setMedias] = useState<any>(null);
    useEffect(() => {
        const LINK = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=avengers`;
        axios
            .get(LINK)
            .then((response) => {
                // handle success
                // console.log(response.data.Search.slice(0, 6));
                setMedias(response.data.Search.slice(0, 5));
            })
            .catch(function (error) {
                // handle error
                setMedias([]);
                console.log("API ERROR:", error);
            });
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
    return (
        <div className="searchAndNomineeSection">
            <h1 className="searchAndNomineeTitle">Search</h1>
            <Searchbar />
            <div className="nomineeMediaContainer">{renderMedias()}</div>
            <h1 className="searchAndNomineeTitle">Nominees</h1>
            <div className="nomineeMediaContainer">{renderMedias()}</div>
        </div>
    );
};

export default Home;
