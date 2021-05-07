import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Media } from "./Home";
import NoImageFound from "../img/NoImageFound.jpg";
import { useTransition, animated, useSpring, useTrail } from "react-spring";
const MANY_ERROR = "Too many results.";
const MOVIE_NOT_FOUND = "Movie not found!";
interface SearchbarProps {
    addItem(item: Media): void;
    medias: any;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    let { addItem, medias } = props;
    //Detect click outside of component:
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, dataSet] = useState<any>(null);
    const [startTrail, setStartTrail] = useState(false);
    useEffect(() => {
        setStartTrail(true);
    }, []);
    useEffect(() => {
        async function fetchMyAPI() {
            setStartTrail(false);
            const LINK = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}`;
            axios
                .get(LINK)
                .then((response) => {
                    // handle success

                    if (response.data.Search)
                        dataSet(response.data.Search.slice(0, 5));
                    else if (response.data.Error === MANY_ERROR)
                        dataSet(MANY_ERROR);
                    else if (response.data.Error === MOVIE_NOT_FOUND)
                        dataSet(MOVIE_NOT_FOUND);
                    setStartTrail(true);
                })
                .catch(function (error) {
                    // handle error

                    console.log("API ERROR:", error);
                    setStartTrail(true);
                });
        }

        const delayDebounceFn = setTimeout(() => {
            // Send Axios request here
            fetchMyAPI();
        }, 550);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleKeyDown = (event: any) => {
        //https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
        if (event.key === "Enter") {
            event.preventDefault();

            // if (searchTerm === "") {
            //     history.push("/search");
            // } else {
            //     if (props.fetchGamesByKeyword)
            //         props.fetchGamesByKeyword(searchTerm);
            //     history.push(`/search?q=${searchTerm}`);
            // }
        }
    };

    const trail = useTrail(data instanceof Array ? data.length : 0, {
        // marginTop: showPresentation ? `1.5rem` : `0px`,
        transform: startTrail
            ? `translate3d(0px,0%,0px)`
            : `translate3d(0px,20%,0px)`,

        opacity: startTrail ? 1 : 0,

        config: {
            duration: 2000,
            // mass: 1,
            // tension: 225,
            // friction: 50,
        },
    });

    const renderSearchPreview = () => {
        if (data) {
            if (data === MANY_ERROR)
                return (
                    <h1 className="noResultText">
                        Too Many Results, Narrow Your Search
                    </h1>
                );
            else if (data === MOVIE_NOT_FOUND)
                return <h1 className="noResultText">{MOVIE_NOT_FOUND}</h1>;
            else if (data instanceof Array) {
                return trail.map((animation, index: number) => {
                    let mediaFromSearch = data[index];
                    let mediasInLocalStorage = medias.find(
                        (o: Media) => o.imdbID === mediaFromSearch.imdbID
                    );
                    return (
                        <animated.div
                            style={animation}
                            key={index}
                            className="nomineeMedia"
                        >
                            <img
                                src={
                                    mediaFromSearch.Poster !== "N/A"
                                        ? mediaFromSearch.Poster
                                        : NoImageFound
                                }
                                className={
                                    mediasInLocalStorage != null
                                        ? "showNomineePosterBorder"
                                        : "hideNominePosterBorder"
                                }
                                alt="poster"
                            />
                            <div
                                className={
                                    mediasInLocalStorage != null
                                        ? "nomineeMediaSelected"
                                        : "nomineeMediaUnselected"
                                }
                            >
                                <h1>Nominated</h1>
                            </div>
                            <div className="nomineeMediaTextWrap">
                                <h1>{mediaFromSearch.Title}</h1>
                                <p>{mediaFromSearch.Year}</p>
                            </div>
                            <button
                                className={`nominateButton  ${
                                    mediasInLocalStorage != null
                                        ? "nominateButtonDisabled"
                                        : ""
                                }
                                `}
                                onClick={() => {
                                    addItem(mediaFromSearch);
                                }}
                                disabled={
                                    mediasInLocalStorage != null ? true : false
                                }
                            >
                                {mediasInLocalStorage != null
                                    ? "Nominated"
                                    : "Nominate"}
                            </button>
                        </animated.div>
                    );
                });
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
                Search
            </animated.h1>
            <form className={"searchBarForm"}>
                <input
                    autoFocus={false}
                    data-testid="searchBarInput"
                    className="searchBarInput"
                    type="search"
                    placeholder="Search titles"
                    name="search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    ref={searchBarInputRef}
                />
                <AiOutlineSearch
                    className="searchBarIcons"
                    data-testid="searchIcon"
                    onClick={() => {
                        history.push(`/search?q=${searchTerm}`);
                    }}
                />
            </form>
            <div className="nomineeMediaContainer">{renderSearchPreview()}</div>
        </React.Fragment>
    );
};
export default Searchbar;
