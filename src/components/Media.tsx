import React, { useState, useEffect, useRef } from "react";
import NoImageFound from "../img/NoImageFound.jpg";
import Modal from "./Modal";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
import axios from "axios";
export interface ModalProps {
    onDismiss(): void;
    title?: string;
    content?: JSX.Element;
    actions?: JSX.Element;
    animation?: any;
    fade?: any;
}

export const mockObj = {
    Title: "The Avengers",
    Year: "2012",
    Rated: "PG-13",
    Released: "04 May 2012",
    Runtime: "143 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Joss Whedon",
    Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
    Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
    Plot:
        "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    Language: "English, Russian, Hindi",
    Country: "USA",
    Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
    Poster:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
};

interface MediaProps {
    media: any;
    removeItem(imdbID: String): void;
}
const Media: React.FC<MediaProps> = (props) => {
    let { media } = props;
    const [showModal, setShowModal] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [mockStore, setMockStore] = useState<any>(mockObj);

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
        // const LINK = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${clickedMedia.imdbID}`;
        // axios
        //     .get(LINK)
        //     .then((response) => {
        //         // handle success
        //         //  setShowLoading(false);
        //         console.log(response.data);
        //         setMockStore(response.data);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         // dataSet(INTERNET_ERROR);
        //         console.log("API ERROR:", error);

        //         //setShowLoading(false);
        //     });
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
                        <img src={mockStore.Poster} alt=""></img>

                        <div className="modalFade"></div>
                    </div>
                </div>
                <div className="modalInfoWrap">
                    <div className="modalTextSection modalTextDateAndDescSection">
                        <p className="modalMediaDate">{mockStore.Year}</p>
                        <p className="modalMediaDesc">{mockStore.Plot}</p>
                    </div>
                    <div className="modalTextSection modalTextCastAndGenreSection">
                        <div className="modalCastAndGenre"></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            {renderModal()}
            <div className="nomineeMedia">
                <img
                    src={media.Poster !== "N/A" ? media.Poster : NoImageFound}
                    onError={(e: any) => {
                        e.target.src = NoImageFound; // some replacement image
                        // e.target.style = 'padding: 8px; margin: 16px' // inline styles in html format
                    }}
                    onClick={() => {
                        modalShow(media);
                    }}
                    alt="poster"
                />
                <div className="nomineeMediaTextWrap">
                    <h1>{media.Title}</h1>
                    <p>{media.Year}</p>
                </div>
                <button
                    className="removeButton"
                    onClick={() => props.removeItem(media.imdbID)}
                >
                    Remove
                </button>
            </div>
        </React.Fragment>
    );
};
export default Media;
