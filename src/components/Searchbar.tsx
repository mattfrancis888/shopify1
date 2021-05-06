import React, { useRef, useEffect, useState } from "react";
import history from "../browserHistory";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

const MANY_ERROR = "Too many results.";
interface SearchbarProps {
    fetchGamesByKeyword?(searchKeyword: string): void;
}

interface Media {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
    //Detect click outside of component:
    // https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, dataSet] = useState<any>(null);
    let [cart, setCart] = useState<[]>([]);
    const addItem = (item: Media) => {
        //create a copy of our cart state, avoid overwritting existing state
        let cartCopy: any = [...cart];

        //assuming we have an ID field in our item
        let { Title } = item;

        //look for item in cart array
        let existingItem = cartCopy.find(
            (cartItem: Media) => cartItem.Title === Title
        );

        //if item already exists

        if (existingItem) {
        } else {
            //if item doesn't exist, simply add it
            cartCopy.push(item);
        }

        //update app state
        setCart(cartCopy);

        //make cart a string and store in local space
        let stringCart = JSON.stringify(cartCopy);
        localStorage.setItem("cart", stringCart);
    };

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
                            <img src={media.Poster} alt="poster" />
                            <div className="nomineeMediaSelected">
                                <h1>Nominated</h1>
                            </div>
                            <div className="nomineeMediaTextWrap">
                                <h1>{media.Title}</h1>
                                <p>{media.Year}</p>
                            </div>
                            <button
                                className="nominateButton"
                                onClick={() => addItem(media)}
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
