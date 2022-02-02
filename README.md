A simple Meme generator using [React](https://reactjs.org)

# Demo
Live demo [here](https://meme.namantam1.tech).

![demo](images/demo.gif)


# Features
- Download meme
- Share meme
- Move text
- Resize text
- Colour text

# Library used

- [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component#readme) : To lazy load images in slider
- [Styles Component](https://styled-components.com/)

# Working

Image and texts is drawn on a SVG and then SVG is exported as `image/png` by chaining it to `blob` object using canvas.

On share image is uploaded to server and image link is shared using Web share API.

Server used to upload image is written in python using Django and DRF. [[link](https://github.com/namantam1/tempfiler)]

## Known Issues
- Color picker lag on changing frequently. Throttling can be used to fixed this issue. 
