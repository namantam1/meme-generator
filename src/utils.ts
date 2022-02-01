import { uploadImage } from "./api/upload";

export const imageToBase64 = (
  imageSrc: string | HTMLImageElement
): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const image = new Image();

      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d")?.drawImage(image, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      image.crossOrigin = "anonymous";

      if (typeof imageSrc === "string") {
        image.src = imageSrc;
      } else {
        image.src = imageSrc.src;
      }
    } catch (e) {
      reject(e);
    }
  });

export const svgToCanvas = (svg: SVGSVGElement) =>
  new Promise<HTMLCanvasElement>((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;

    const img = new Image();
    img.onload = function () {
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      resolve(canvas);
    };
    img.src = "data:image/svg+xml," + encodeURIComponent(svgData);
  });

export const exportSvg = async (svg: SVGSVGElement) => {
  const a = document.createElement("a");
  a.href = (await svgToCanvas(svg)).toDataURL("image/png");
  a.download = "meme.png";
  a.click();
};

export const shareImage = async (file: Blob) => {
  const res = await uploadImage(file);

  if (res) {
    const shareData = {
      title: "Meme",
      text: "Checkout this awesome meme!",
      url: res.url,
    };
    try {
      await navigator.share(shareData);
      console.log("done!");
    } catch (err) {
      console.log(err);
    }
  }
};

export type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => ReturnType<T>;

export function throttle<T extends (...args: any) => any>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: any): ReturnType<T> {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      inThrottle = true;

      setTimeout(() => (inThrottle = false), limit);

      lastResult = func.apply(context, args as any);
    }

    return lastResult;
  };
}
