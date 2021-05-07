import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Search from "./Search";
import NoImageFound from "../img/NoImageFound.jpg";
import HomeCarousel from "./HomeCarousel";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import useOnScreen from "../useOnScreen";
import { Media } from "./Home";
import Modal from "./Modal";
export const MAX_NOMINEE = 5;

export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
    animation?: any;
    fade?: any;
}

interface NomineeProps {
    medias: any;
    removeItem(imdbID: String): void;
}
const Nominee: React.FC<NomineeProps> = (props) => {
    let { medias } = props;
    const [startTrail, setStartTrail] = useState(false);
    const maxNomineesBannerRef = useRef<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const [showModalContent, setShowModalContent] = useState<any>(null);

    const transition = useTransition(showModal, {
        from: {
            transform: showModal ? "scale(0)" : "scale(1)",
        },
        enter: {
            transform: showModal ? "scale(1)" : "scale(0)",
        },

        config: {
            duration: 450,
        },
    });
    const fade = useSpring({
        from: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0)"
                : "rgba(52, 49, 49, 0.4)",
            pointerEvents: showModal ? "all" : "none",
        },
        to: {
            backgroundColor: showModal
                ? "rgba(52, 49, 49, 0.4)"
                : "rgba(52, 49, 49, 0)",
            pointerEvents: showModal ? "all" : "none",
        },
    });

    const modalShow = (clickedMedia: any) => {
        setFirstRender(false);
        setShowModal(true);
        setShowModalContent({ ...clickedMedia });
        // props.fetchMediaGenreAndCast(clickedMedia.media_id);
    };
    const modalOnCancel = () => {
        setShowModal(false);
    };

    const renderModal = () => {
        return transition((style, item) => {
            if (!firstRender)
                return (
                    <Modal
                        animation={style}
                        fade={fade}
                        content={renderModalContent()}
                        onDismiss={modalOnCancel}
                    />
                );
            else {
                <Modal
                    content={renderModalContent()}
                    onDismiss={modalOnCancel}
                />;
            }
        });
    };

    const renderModalContent = () => {
        return (
            <div className="modalContentContainer" onLoad={() => {}}>
                <div className="modalBannerContainer">
                    <div className="modalBannerImageWrap">
                        <img src={showModalContent?.banner_image} alt=""></img>

                        <div className="modalFade"></div>
                    </div>
                    <div className="browseBannerTitleImageAndInfoWrap">
                        <img
                            src={showModalContent?.banner_title_image}
                            alt=""
                        ></img>
                        <button
                            className="modalWatchButton"
                            onClick={() => {
                                Number.isInteger(showModalContent?.media_id)
                                    ? //@ts-ignore Small TS warning, too lazy to fix
                                      addToWatching(showModalContent?.media_id)
                                    : //   modalOnCancel();
                                      alert(
                                          "Trouble adding your movie to your watch list..."
                                      );
                                modalOnCancel();
                            }}
                        >
                            Watch Now
                        </button>
                    </div>
                </div>
                <div className="modalInfoWrap">
                    <div className="modalTextSection modalTextDateAndDescSection">
                        <p className="modalMediaDate">
                            {showModalContent?.media_date}
                        </p>
                        <p className="modalMediaDesc">
                            {showModalContent?.media_description}
                        </p>
                    </div>
                    <div className="modalTextSection modalTextCastAndGenreSection">
                        <div className="modalCastAndGenre"></div>
                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        setStartTrail(true);
    }, []);
    useEffect(() => {
        if (medias.length === MAX_NOMINEE)
            maxNomineesBannerRef.current?.scrollIntoView({
                behavior: "smooth",
            });
    }, [medias.length]);

    const bannerAnimate = useTransition(medias.length, {
        from: {
            opacity: "0",
        },
        enter: {
            opacity: "1",
        },
        leave: {
            opacity: "0",
        },

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
                                    onClick={() => {
                                        modalShow({});
                                    }}
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
            {renderModal()}
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
