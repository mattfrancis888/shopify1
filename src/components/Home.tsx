import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import NoImageFound from "../img/NoImageFound.jpg";
import HomeCarousel from "./HomeCarousel";
export interface Media {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const MAX_NOMINEE = 5;
const Home: React.FC<{}> = () => {
    let [media, setMedia] = useState<[]>([]);
    let localMedia = localStorage.getItem("media");
    useEffect(() => {
        if (localMedia != null) {
            let parsedLocalmedia = JSON.parse(localMedia);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setMedia(parsedLocalmedia);
        }
    }, []);

    const addItem = (item: Media) => {
        //create a copy of our cart state, avoid overwritting existing state
        let mediaCopy: any = [...media];

        //assuming we have an ID field in our item
        let { imdbID } = item;

        //look for item in cart array
        let existingItem = mediaCopy.find(
            (mediaItem: Media) => mediaItem.imdbID === imdbID
        );

        //if item already exists

        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            mediaCopy.push(item);
        }

        //update app state
        setMedia(mediaCopy);

        //make cart a string and store in local space
        let stringMedia = JSON.stringify(mediaCopy);
        localStorage.setItem("media", stringMedia);
    };

    const removeItem = (imdbID: String) => {
        //create cartCopy
        let mediaCopy: any = [...media];

        mediaCopy = mediaCopy.filter((item: Media) => item.imdbID !== imdbID);

        //update state and local
        setMedia(mediaCopy);

        let mediaString = JSON.stringify(mediaCopy);
        localStorage.setItem("media", mediaString);
    };

    const renderMedias = () => {
        if (media) {
            if (media.length > 0)
                return (
                    <React.Fragment>
                        {media.map((media: Media, index: number) => {
                            return (
                                <div key={index} className="nomineeMedia">
                                    <img
                                        src={
                                            media.Poster !== "N/A"
                                                ? media.Poster
                                                : NoImageFound
                                        }
                                        onError={(e: any) => {
                                            e.target.src = NoImageFound; // some replacement image
                                            // e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
                                        }}
                                        alt="poster"
                                    />
                                    <div className="nomineeMediaTextWrap">
                                        <h1>{media.Title}</h1>
                                        <p>{media.Year}</p>
                                    </div>
                                    <button
                                        className="removeButton"
                                        onClick={() => removeItem(media.imdbID)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            else {
                return (
                    <h1 className="noResultText">You Have No Nominations</h1>
                );
            }
        }
    };

    return (
        <React.Fragment>
            <HomeCarousel />
            <div className="homeContentSection">
                <div className="introBanner">
                    <div className="introBannerTextWrap">
                        <h1 className="introBannerTitle">2021 Nominees</h1>
                        <p className="introBannerTitleDesc">
                            Search titles on OMDB and nominate your top 5.
                        </p>
                    </div>
                    {/* <div className="modalFade"></div> */}
                    <img
                        className="ironManImage"
                        alt=""
                        src="https://purepng.com/public/uploads/large/purepng.com-ironmanironmansuperheromarvel-comicscharactermarvel-studiosrobert-downey-jrtony-stark-1701528612052n7gmm.png"
                    ></img>
                </div>

                <Search media={media} addItem={addItem} />
                <h1 className="searchAndNomineeTitle">Nominees</h1>

                {
                    //@ts-ignore
                    media.length === MAX_NOMINEE && (
                        <div className="maxNomineesBanner">
                            <h1 className="maxNomineesTitle">
                                Your 2021 Winners
                            </h1>
                            <p className="maxNomineesDesc">
                                You have picked your top 5 nominees
                            </p>
                        </div>
                    )
                }
                <div className="nomineeMediaContainer">{renderMedias()}</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
