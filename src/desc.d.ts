declare module "react-lazyload";
declare module "animejs/lib/anime.es.js";
declare module "*.mp4" {
    const src: string;
    export default src;
}

declare module "*.webm" {
    const src: string;
    export default src;
}
