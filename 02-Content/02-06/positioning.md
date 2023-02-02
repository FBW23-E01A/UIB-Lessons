# Positioning

We can use the CSS property `position` to change the way HTML elements are positioned in the page.

The `position` property can have 1 of the following 5 values:

- `static` (default)
- `relative`
- `absolute`
- `fixed`
- `sticky

By default, every HTML element has the value `static` for `position`. These elements behave normally, like we've seen so far.

When we set any one of the other possible values for the `position` property, we say that the element is **positioned** and it gains new capabilities, explained as follow.

## top, right, bottom, left

Positioned elements can be positioned (moved around) in the page using the properties `top`, `right`, `bottom`, `left`.

- `top` and `bottom` contribute to the **vertical** positioning of an element
- `right` and `left` contribute to the **horizontal** positioning of an element

## Relative

An element with `position: relative;` can be controlled using the `top`, `right`, `bottom`, `left` properties.

For example:

```css
.box {
    background-color: tomato;
    height: 100px;
    width: 100px;
    position: relative;
    left: 15px;
    top: 15px;
}
```

The element with class `box` will appear moved to the right and to the bottom by 15px, compared to its original position in the page.

It seems counterintuitive that by specifying `left: 15px` we are moving the element to the right. You can think of these properties as a way of pushing an element from a certain direction.

As mentioned above, the element will still be part of the document flow: this means that the `box` still occupies space in the page.

## Absolute

An element with `position: absolute;` is removed out of the flow of the document.

This means that the element doesn't occupy space on the page like it originally did. It's like it sits on another level, and because of this other elements will appear under it.

You can easily check this by implenting the example below:

```html
<div class="box"></div>
<h1>Some text...</h1>
```

```css
.box {
    background-color: tomato;
    height: 100px;
    width: 100px;
    position: absolute;
}
```

You'll notice that the title and the box will appear overlapped.

Similar to `relative` elements, we can move an absolutely positioned element using `top`, `right`, `bottom`, `left` properties.

The difference here is that the `absolute` element will be positioned in relation to the whole page or to the closest **positioned** parent.

**IMPORTANT**: a positioned element is an element that has a `position` different than `static`.

For example:

```html
<div class="container">
    <div class="box"></div>
</div>
```

```css
.container {
    margin: auto;
    position: relative;
    width: 50%;
}

.box {
    position: absolute;
    bottom: 50px;
    right: 0;
}
```

In the example above, the `box` will be positioned close to the bottom right corner of the `container`, rather than of the whole page.

Also, an element with `position: absolute;` will lose the normal feature of block elements. For example, a `div` will not occupy the whole page anymore, that's why most of the time we have to take care of specifying a `width` and a `height` ourselves.

## Fixed

Elements with `position: fixed;` behave similarly to `absolute` elements: they are removed from the regular flow of the document, they don't occupy any space and lose the normal `block` property.

You can also position them in relation to the whole page using the `top`, `right`, `bottom`, `left` properties.

The difference is that once an element is `fixed` it will stay still even if you scroll the page.

This is often used to create navigation menus that are always visible on top or footers fixed at the bottom.

For example:

```html
<header class="main-header">
    <nav>This is the navigation</nav>
</header>
...
```

```css
.main-header {
    background-color: tomato;
    position: fixed;
    top: 0;
    width: 100%;
}
```

In the example above the `header` element will always be visible at the top of the page even when scrolling, covering other elements.

## Sticky


## z-index

Whenever we have positioned elements overlapping with each other, in some situations we can use the `z-index` property to specify which one should appear on top of the other.

The way in which the browser calculates which element should appear on top of another depends on the value of `z-index`:

- the higher the value, the higher the chances of an element to appear on top of other elements
- the lower the value, the higher the chances of an element to appear under, covered by, other elements
