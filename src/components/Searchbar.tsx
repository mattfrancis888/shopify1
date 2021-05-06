import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

import useComponentVisible from "../useComponentVisible";
const MANY_ERROR = "Too many results.";
interface SearchbarProps {
    fetchGamesByKeyword?(searchKeyword: string): void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    //Detect click outside of component:
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible,
    } = useComponentVisible(true);
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, dataSet] = useState<any>(null);

    useEffect(() => {
        console.log(searchTerm);
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

            if (searchTerm === "") {
                history.push("/search");
            } else {
                if (props.fetchGamesByKeyword)
                    props.fetchGamesByKeyword(searchTerm);
                history.push(`/search?q=${searchTerm}`);
            }
        }
    };
    const renderSearchPreview = () => {
        if (data) {
            console.log(data);
            if (data === MANY_ERROR)
                return <h1>Too Many Results, Narrow Your Search</h1>;
            else if (data instanceof Array) {
                return data.map((media: any, index: number) => {
                    return (
                        <div key={index} className="nomineeMedia">
                            <img src={media.Poster} alt="poster" />
                            <div className="nomineeMediaTextWrap">
                                <h1>{media.Title}</h1>
                                <p>{media.Type}</p>
                            </div>
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
                    onClick={() => setIsComponentVisible(true)}
                />
                <AiOutlineSearch
                    className="searchBarIcons"
                    data-testid="searchIcon"
                    onClick={() => {
                        history.push(`/search?q=${searchTerm}`);
                    }}
                />
                <div
                    className={`matchContainer ${
                        isComponentVisible ? "" : "hideMatchContainer"
                    }`}
                    ref={ref}
                ></div>
            </form>
            <div className="nomineeMediaContainer">{renderSearchPreview()}</div>
        </React.Fragment>
    );
};
export default Searchbar;
