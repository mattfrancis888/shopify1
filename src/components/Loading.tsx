import BeatLoader from "react-spinners/BeatLoader";
const Loading = (): JSX.Element => {
    return (
        <div className="loadingCenter">
            <BeatLoader color={"white"} loading={true} />
        </div>
    );
};
export default Loading;
