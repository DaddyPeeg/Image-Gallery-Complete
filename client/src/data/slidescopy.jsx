import { usePost } from "../hooks/use-post";

const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];
const imageLink = (imageName, width) =>
  `${import.meta.env.VITE_LOCALIP}:${
    import.meta.env.VITE_SERVER_PORT
  }/assets/${width}_Image/${imageName}.jpg`;

const fetchData = () => {
  const { data, isLoading } = usePost();
  if (!isLoading) {
    const slides = data.files.map((image) => {
      const width = 4320;
      const height = 4320;
      return {
        src: imageLink(image, width),
        width,
        height,
        srcSet: breakpoints.map((breakpoint) => {
          const breakpointHeight = 1000;
          return {
            src: imageLink(image, breakpoint),
            width: breakpoint,
            height: breakpointHeight,
          };
        }),
      };
    });
    return slides;
  }
};

export default fetchData;
