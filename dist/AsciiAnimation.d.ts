export interface AsciiAnimationData {
    animation: string;
    animationColors?: string;
    frameRate: number;
    title: string;
    frameCount: number;
}
interface AsciiAnimationProps {
    color?: string;
    height?: number;
    width?: number;
    animation: AsciiAnimationData;
}
export declare function AsciiAnimation({ color, height, width, animation, }: AsciiAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AsciiAnimation.d.ts.map