import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import NoImageFound from "../img/NoImageFound.jpg";
import HomeCarousel from "./HomeCarousel";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import { Media } from "./Home";
const MAX_NOMINEE = 5;
interface NomineeProps {
    medias: any;
    removeItem(imdbID: String): void;
}
const Nominee: React.FC<NomineeProps> = (props) => {
    let { medias } = props;
    const renderMedias = () => {
        if (medias) {
            if (medias.length > 0)
                return (
                    <React.Fragment>
                        {medias.map((media: Media, index: number) => {
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
                                        onClick={() =>
                                            props.removeItem(media.imdbID)
                                        }
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
            <animated.h1
                style={translateTitle}
                className="searchAndNomineeTitle"
            >
                Nominees
            </animated.h1>

            {
                //@ts-ignore
                medias.length === MAX_NOMINEE && (
                    <div className="maxNomineesBanner">
                        <h1 className="maxNomineesTitle">Your 2021 Winners</h1>
                        <p className="maxNomineesDesc">
                            You have picked your top 5 nominees
                        </p>
                    </div>
                )
            }
            <div className="nomineeMediaContainer">{renderMedias()}</div>
        </React.Fragment>
    );
};

export default Nominee;
