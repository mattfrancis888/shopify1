import React, { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import { title } from "process";
export interface Media {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}
const Home: React.FC<{}> = () => {
    const [medias, setMedias] = useState<any>(null);
    let [cart, setCart] = useState<[]>([]);
    let localCart = localStorage.getItem("cart");
    useEffect(() => {
        if (localCart != null) {
            let parsedLocalCart = JSON.parse(localCart);
            //load persisted cart into state if it exists
            // console.log(parsedLocalCart);
            setCart(parsedLocalCart);
        }
    }, []);
    // const removeItem = (gameId: number) => {
    //     //create cartCopy
    //     let cartCopy: any = [...cart];

    //     cartCopy = cartCopy.filter((item: Media) => item.Title != title);

    //     //update state and local
    //     setCart(cartCopy);

    //     let cartString = JSON.stringify(cartCopy);
    //     localStorage.setItem("cart", cartString);
    // };

    const renderMedias = () => {
        if (cart) {
            return (
                <React.Fragment>
                    {cart.map((media: Media, index: number) => {
                        return (
                            <div key={index} className="nomineeMedia">
                                <img src={media.Poster} alt="poster" />
                                <div className="nomineeMediaTextWrap">
                                    <h1>{media.Title}</h1>
                                    <p>{media.Type}</p>
                                </div>
                            </div>
                        );
                    })}
                </React.Fragment>
            );
        }
    };
    return (
        <React.Fragment>
            <div className="introBanner">
                <img
                    className="introBannerImage"
                    alt=""
                    src="https://allears.net/wp-content/uploads/2020/10/Avengers-Infinity-War-Poster.jpg"
                ></img>
                <div className="introBannerTextWrap">
                    <h1 className="introBannerTitle">2021 Nominees</h1>
                    <p className="introBannerTitleDesc">
                        Search titles on OMDB and nominate your top 5.
                    </p>
                </div>
                <div className="modalFade"></div>
                <img
                    className="ironManImage"
                    alt=""
                    src="https://purepng.com/public/uploads/large/purepng.com-ironmanironmansuperheromarvel-comicscharactermarvel-studiosrobert-downey-jrtony-stark-1701528612052n7gmm.png"
                ></img>
            </div>
            <div className="searchAndNomineeSection">
                <Searchbar />

                <h1 className="searchAndNomineeTitle">Nominees</h1>
                <div className="nomineeMediaContainer">{renderMedias()}</div>
            </div>
        </React.Fragment>
    );
};

export default Home;
