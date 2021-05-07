import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import NoImageFound from "../img/NoImageFound.jpg";
import HomeCarousel from "./HomeCarousel";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import { Media } from "./Home";
export const MAX_NOMINEE = 5;
interface NomineeProps {
    medias: any;
    removeItem(imdbID: String): void;
}
const Nominee: React.FC<NomineeProps> = (props) => {
    let { medias } = props;
    const [startTrail, setStartTrail] = useState(false);
    const maxNomineesBannerRef = useRef<any>(null);
    useEffect(() => {
        setStartTrail(true);
    }, []);
    useEffect(() => {
        if (medias.length === MAX_NOMINEE)
            maxNomineesBannerRef.current?.scrollIntoView({
                behavior: "smooth",
            });
    }, [medias.length]);

    const top = useSpring({
        from: {
            width: "0%",
        },
        to: {
            width: "100%",
        },

        config: {
            duration: 1000,
            // mass: 1,
            // tension: 250,
            // friction: 30,
        },
    });

    const right = useSpring({
        from: {
            height: "0%",
        },
        to: {
            height: "100%",
        },

        delay: 1000,
        config: {
            duration: 1000,
            // mass: 1,
            // tension: 250,
            // friction: 30,
        },
    });

    const bottom = useSpring({
        from: {
            transform: "scaleX(0)",
        },
        to: {
            transform: "scaleX(1)",
        },
        delay: 2000,
        config: {
            duration: 1000,
            // mass: 1,
            // tension: 250,
            // friction: 30,
        },
    });

    const left = useSpring({
        from: {
            transform: "scaleY(0)",
        },
        to: {
            transform: "scaleY(1)",
        },
        delay: 3000,
        config: {
            duration: 1000,
            // mass: 1,
            // tension: 250,
            // friction: 30,
        },
    });
    const renderMedias = () => {
        if (medias) {
            if (medias.length > 0)
                return (
                    <React.Fragment>
                        {trail.map((animation, index: number) => {
                            let media = medias[index];
                            return (
                                <animated.div
                                    style={animation}
                                    key={index}
                                    className="nomineeMedia"
                                >
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
                                </animated.div>
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

    const trail = useTrail(medias.length || 0, {
        // marginTop: showPresentation ? `1.5rem` : `0px`,
        transform: startTrail
            ? `translate3d(0px,0%,0px)`
            : `translate3d(0px,20%,0px)`,

        opacity: startTrail ? 1 : 0,

        config: {
            // duration: 2000,
            mass: 1,
            tension: 225,
            friction: 50,
        },
    });

    return (
        <React.Fragment>
            <animated.h1
                style={translateTitle}
                className="searchAndNomineeTitle"
            >
                Your Nominees
            </animated.h1>
            {/* <span ref={maxNomineesBannerRef}></span> */}
            {
                //@ts-ignore
                medias.length === MAX_NOMINEE && (
                    <div
                        className="maxNomineesBanner"
                        ref={maxNomineesBannerRef}
                    >
                        <h1 className="maxNomineesTitle">Your 2021 Winners</h1>
                        <p className="maxNomineesDesc">
                            You have picked your top 5 nominees
                        </p>
                        <div className="bannerBorder">
                            <animated.span
                                className="top"
                                style={top}
                            ></animated.span>
                            <animated.span
                                className="right"
                                style={right}
                            ></animated.span>
                            <animated.span
                                className="bottom"
                                style={bottom}
                            ></animated.span>
                            <animated.span
                                className="left"
                                style={left}
                            ></animated.span>
                        </div>
                    </div>
                )
            }
            <div className="nomineeMediaContainer">{renderMedias()}</div>
        </React.Fragment>
    );
};

export default Nominee;
