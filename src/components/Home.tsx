import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import Nominee from "./Nominee";
import NoImageFound from "../img/NoImageFound.jpg";
import HomeCarousel from "./HomeCarousel";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import LazyLoad from "react-lazyload";
export interface Media {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const MAX_NOMINEE = 5;
const Home: React.FC<{}> = () => {
    let [medias, setMedias] = useState<[]>([]);
    let localMedias = localStorage.getItem("media");
    useEffect(() => {
        if (localMedias != null) {
            let parsedLocalMedias = JSON.parse(localMedias);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setMedias(parsedLocalMedias);
        }
    }, []);

    const addItem = (item: Media) => {
        //create a copy of our cart state, avoid overwritting existing state
        let mediasCopy: any = [...medias];

        //assuming we have an ID field in our item
        let { imdbID } = item;

        //look for item in cart array
        let existingItem = mediasCopy.find(
            (mediaItem: Media) => mediaItem.imdbID === imdbID
        );

        //if item already exists

        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            mediasCopy.push(item);
        }

        //update app state
        setMedias(mediasCopy);

        //make cart a string and store in local space
        let stringMedias = JSON.stringify(mediasCopy);
        localStorage.setItem("media", stringMedias);
    };

    const removeItem = (imdbID: String) => {
        //create cartCopy
        let mediasCopy: any = [...medias];

        mediasCopy = mediasCopy.filter((item: Media) => item.imdbID !== imdbID);

        //update state and local
        setMedias(mediasCopy);

        let mediaString = JSON.stringify(mediasCopy);
        localStorage.setItem("media", mediaString);
    };

    const translateTitle = useSpring({
        from: {
            transform: "translate3d(-10% , 0%, 0px)",
        },
        to: {
            transform: "translate3d(0% , 0%, 0px)",
        },

        config: {
            mass: 2,
            friction: 40,
            tension: 70,
        },
    });

    return (
        <React.Fragment>
            <HomeCarousel />
            <div className="homeContentSection">
                <div className="introBanner">
                    <animated.div
                        className="introBannerTextWrap"
                        style={translateTitle}
                    >
                        <h1 className="introBannerTitle">2021 Nominees</h1>
                        <p className="introBannerTitleDesc">
                            Search titles on OMDB and nominate your top 5.
                        </p>
                    </animated.div>
                    {/* <div className="modalFade"></div> */}
                    <img
                        className="ironManImage"
                        alt=""
                        src="https://purepng.com/public/uploads/large/purepng.com-ironmanironmansuperheromarvel-comicscharactermarvel-studiosrobert-downey-jrtony-stark-1701528612052n7gmm.png"
                    ></img>
                </div>

                <LazyLoad>
                    <Search medias={medias} addItem={addItem} />
                </LazyLoad>

                <LazyLoad offset={50}>
                    <Nominee medias={medias} removeItem={removeItem} />
                </LazyLoad>
            </div>
        </React.Fragment>
    );
};

export default Home;
