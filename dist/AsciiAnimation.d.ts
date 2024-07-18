export interface AsciiAnimationData {
    animation: string;
    animationColors?: string;
    frameRate: number;
    title: string;
    fileSize: number;
    frameCount: number;
}
interface AsciiAnimationProps {
    color?: string;
    height: number;
    animation: AsciiAnimationData;
}
export declare function AsciiAnimation({ color, height, animation, }: AsciiAnimationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AsciiAnimation.d.ts.map