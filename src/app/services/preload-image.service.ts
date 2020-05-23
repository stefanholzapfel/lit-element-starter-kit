export class PreloadImageService {
    public static loadImage(url: string, crossOriginHeader?: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.addEventListener('load', e => resolve(img));
            img.addEventListener('error', () => {
                reject(new Error(`Failed to load image's URL: ${url}`));
            });
            if (crossOriginHeader) {
                img.crossOrigin = crossOriginHeader;
            }
            img.src = url;
        });
    }
}
