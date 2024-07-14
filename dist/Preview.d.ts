export interface Animation {
    animation: string;
    animationColors?: string;
    frameRate: number;
    title: string;
}
interface PreviewProps {
    color?: string;
    height: number;
    animation: Animation;
}
export declare function Preview({ color, height, animation }: PreviewProps): import("react/jsx-runtime").JSX.Element;
export {};
