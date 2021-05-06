import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Media } from "./Home";
const MANY_ERROR = "Too many results.";
interface SearchbarProps {
    addItem(item: Media): void;
    cart: any;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    let { addItem, cart } = props;
    //Detect click outside of component:
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, dataSet] = useState<any>(null);

    useEffect(() => {
        async function fetchMyAPI() {
            const LINK = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}`;
            axios
                .get(LINK)
                .then((response) => {
                    // handle success

                    if (response.data.Search)
                        dataSet(response.data.Search.slice(0, 5));
                    else if (response.data.Error === MANY_ERROR)
                        dataSet(MANY_ERROR);
                })
                .catch(function (error) {
                    // handle error

                    console.log("API ERROR:", error);
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
    const renderSearchPreview = () => {
        if (data) {
            if (data === MANY_ERROR)
                return <h1>Too Many Results, Narrow Your Search</h1>;
            else if (data instanceof Array) {
                return data.map((media: Media, index: number) => {
                    return (
                        <div key={index} className="nomineeMedia">
                            <img
                                src={media.Poster}
                                className={
                                    cart.find(
                                        (o: Media) => o.Title === media.Title
                                    ) != null
                                        ? "showNomineePosterBorder"
                                        : "hideNominePosterBorder"
                                }
                                alt="poster"
                            />
                            <div
                                className={
                                    cart.find(
                                        (o: Media) => o.Title === media.Title
                                    ) != null
                                        ? "nomineeMediaSelected"
                                        : "nomineeMediaUnselected"
                                }
                            >
                                <h1>Nominated</h1>
                            </div>
                            <div className="nomineeMediaTextWrap">
                                <h1>{media.Title}</h1>
                                <p>{media.Year}</p>
                            </div>
                            <button
                                className="nominateButton"
                                onClick={() => {
                                    addItem(media);
                                }}
                                disabled={
                                    cart.find(
                                        (o: Media) => o.Title === media.Title
                                    ) != null
                                        ? true
                                        : false
                                }
                            >
                                Nominate
                            </button>
                        </div>
                    );
                });
            }
        }
    };
    return (
        <React.Fragment>
            <h1 className="searchAndNomineeTitle">Search</h1>
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
