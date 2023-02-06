## Background images

To add and control the background of HTML elements through CSS we have 8 properties.

In alphabetical order, they are:

- `background-attachment`
- `background-clip`
- `background-color`
- `background-image`
- `background-origin`
- `background-position`
- `background-repeat`
- `background-size`

So far we've been using `background-color` to change the color of elements. We can use similar properties to add external images as a background.

## Background image

The first step to add an image as a background is to set the `background-image` property.

Imagining that we have a `div` on our page with class `header-background` and an image called `background.jpg`, we can do:

```css
.header-background {
    background-image: url("background.jpg");
    height: 300px;
}
```

This will make the `div` appear with the image as a background.

We need to add a `height` to the element because the `background-image` doesn't count as content, so unless there is some text or other elements inside the `div`, the `div` will have `height` 0 and be invisible on the page.

The image added like this will have its original size, very often too big.

## Backgorund size

Following from the above example, we can control the size of the background with the property `background-size`

```css
.header-background {
    background-image: url("background.jpg");
    background-size: cover;
    height: 300px;
}
```

By using the value `cover` we make sure that the background image keeps the right proportion and fits nicely inside the `div`. This is very similar to what we can do with images and the `object-fit` property.

Other possible values are:

- `cover`
- `contain`
- 1 value to set the width:
    - `30%`
    - `200px`
    - `400px`
- 2 values to specify width and height
    - `30% 50%` 
    - `200px 300px` 

Very often we simply need to specify `cover`.

## Repeating background

It might happen that a background image is smaller than the container. In such cases, by default the images will be repeated inside the element until it occupies the whole space.

We can control this behaviour with the property `background-repeat`, by setting the value `no-repeat`.

The `repeat` behaviour could be useful if the background image is some kind of pattern that makes sense to be repeated.

## Background position

Similar to the property `object-position`, we can control the position of a background image in CSS. 

The way it works is almost identical and tipically it's common to set the background in the center or to the top. There are of course exceptions.

```css
background-position: center;


background-position: top;
```

## Other properties

Properties like `background-attachment`, `background-clip`, `background-origin` are not commonly used.

## Gradients

With the property `background-image` we can also add `gradients` as backgrounds.

A `gradient` is an image consisting of a progressive transition between 2 or more colors.

There are 3 main kind of gradients:

- `linear-gradient()`
    - in a linear gradient the transition between colors follows a straight line
- `radial-gradient()`
    - in a radial gradient the transition between colors starts from a point and "radiates" in a circular way
- `conic-gradient()`
    - in a conic gradient the transition between colors is the result of a rotation around a point


Look at the syntax and examples at the following links:
- [Linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient)
- [Radial gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient)
- [Conic gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient)
