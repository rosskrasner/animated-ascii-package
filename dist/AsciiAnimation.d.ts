export interface AsciiAnimationData {
    animation: string;
    animationColors?: string;
    frameRate: number;
    title: string;
}
interface AsciiAnimationProps {
    color?: string;
    height: number;
    animation: AsciiAnimationData;
}
export declare function AsciiAnimation({ color, height, animation, }: AsciiAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
