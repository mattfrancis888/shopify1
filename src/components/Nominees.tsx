import React, { useState, useEffect, useRef } from "react";

import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import Media from "./Media";
import NoImageFound from "../img/NoImageFound.jpg";
// import { Media } from "./Home";

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
        if (medias.length === MAX_NOMINEE) {
            maxNomineesBannerRef.current?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [medias.length]);

    const bannerAnimate = useTransition(medias.length, {
        from: {
            opacity: "0",
        },
        enter: {
            opacity: "1",
        },

        // leave: {
        //     transform: "scaleY(0)",
        // },

        config: {
            mass: 1,
            duration: 1000,
            // tension: 200,
            // friction: 50,
        },
    });

    const top = useSpring({
        from: {
            width: "0%",
        },
        to: {
            width: "100%",
        },
        //width: !startBorder ? "0%" : "100%",
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
        //  height: !startBorder ? "0%" : "100%",

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
        // transform: !startBorder ? "scaleX(0)" : "scaleX(1)",

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
        // transform: !startBorder ? "scaleY(0)" : "scaleY(1)",
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
                                    className="nomineeMedia"
                                    style={animation}
                                    key={index}
                                >
                                    <Media media={media}>
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                props.removeItem(media.imdbID);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </Media>
                                </animated.div>
                            );
                        })}
                    </React.Fragment>
                );
            else {
                return (
                    <animated.h1
                        style={translateTitle}
                        className="noResultText"
                    >
                        You Have No Nominations
                    </animated.h1>
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
            {bannerAnimate((animation, item) => {
                return (
                    //@ts-ignore
                    item === MAX_NOMINEE && (
                        <animated.div
                            style={animation}
                            className="maxNomineesBanner"
                            ref={maxNomineesBannerRef}
                        >
                            <h1 className="maxNomineesTitle">
                                Your 2021 Winners
                            </h1>
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
                        </animated.div>
                    )
                );
            })}

            <div className="nomineeMediaContainer">{renderMedias()}</div>
        </React.Fragment>
    );
};

export default Nominee;
