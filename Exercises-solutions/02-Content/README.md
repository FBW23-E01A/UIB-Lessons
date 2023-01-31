# Content 4 Days

## Basic HTML tags

### Headings

In HTML we have 6 tags for creating headings

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```
`<h1>` is considered to be the main heading in a page and each other heading should follow a hierarchy.

So a heading for a subsection would be `<h2>` and a sub-sub-section `<h3>` and so on.

Articles on Wikipedia are a good example of how to use these tags properly.

### Paragraphs

To add a block of text to a page we can use the `<p>` tag.

You can think of it as a way to display a paragraph in a book and each new paragraph would be a new `<p>` tag.

```html
<p>This is a paragraph</p>
<p>This is another paragraph</p>
```

The tag could be used also for simple text in different situations.

### Anchors

To create links to other resources, like external websites or other HTML pages in our website we can use the `<a>` tag.

To work, the tag needs to have a `href` attribute where we specify the link to the resource.

For example:

```html
<a href="http://example.com">example.com</a>
<a href="about.html">About</a>
```

In the examples above we see how to link to an external website or to a local HTML document.

We can use this tag for links internal to a page as well. For example, if in a document we have different sections, we can create a link to each one of these sections. In this case, we have to rely on `id`s.

```html
<a href="#about">about</a>
<a href="#work">work</a>
<a href="#contact">contact</a>
...

<h2 id="about">About</h2>
...
<h2 id="work">Work</h2>
...
<h2 id="contact">Contact</h2>
...
```

### Lists

In HTML we can create lists with the combination of 2 tags:

The `<ul>` tag and a series of `<li>` tags for each item in the list.

For example:

```html
<ul>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
</ul>
```

The one above, is an Unordered List. We can also create ordered lists replacing the `<ul>` with the `<ol>` tag.

```html
<ol>
    <li>list item 1</li>
    <li>list item 2</li>
    <li>list item 3</li>
</ol>
```

Lists are also commonly used to create navigation menus.

For example:

```html
<ul>
    <li><a href="index.html">home</a></li>
    <li><a href="about.html">about</a></li>
    <li><a href="contact.html">contact</a></li>
</ul>
```

To remove the bullet points or other symbols from the list, we can do this in CSS:

```css
ul {
    list-style-type: none;
}
```

### Content Division

We can use the `<div>` element to create containers for all other HTML elements. We can use these containers to apply styles.

For example, let's say that we have a heading, some links and a paragraph, and we want to add a border all around them.

We can put the elements in a `div`:

```html
<div class="container">
    <h2>Title</h2>
    <a href="#">link 1</a>
    <a href="#">link 2</a>
    <a href="#">link 3</a>
    <p>Some text...</p>
</div>
```

Then, with CSS, we can add a border to the whole container:

```css
.container {
    border: 3px solid green;
}
```

### Image

To add images to a page, we use the `<img>` tag.

Unlike other tags shown above, this is a self-closing tag, so it's enough to use it like this:

```html
<img src="path/to/image.png">
```

Sometimes you might see a slash `/` at the end of the tag.

```html
<img src="path/to/image.png" />
```

That was a requirement with previous HTML versions, but nowadays it's the same to have it or not.

#### Image attributes

When using images it's very important to use the `title` and `alt` attribute:

```html
<img title="Title of the image" alt="Description of the image" src="path/to/the/image.png">
```

The `alt` is the alternative text and is important to use it to provide a text description of the image for accessibility reasons or in case the image doesn't load correctly.

## CSS

We use CSS to style the HTML elements on the page.

After linking our CSS file to the HTML we create rules to change the appearance of the elements.

```css
p {
    color: #0a0a0a;
    font-size: 1.5em;
}
```

### Targeting element

To apply a style to one or more element we need to target the elements.

There are 3 main ways to do that.

Using the name of an HTML element directly:

```css
a {}
p {}
div {}
```

In the examples above, we would apply styles to all the `a`, the `p` and the `div` tags on the page.

Very often, rather than applying a style to all elements, we want to target a specific one. We can do this using a class:

```css
.class-name {}
```

With the CSS above, we are targeting elements that have the class `class-name`.

We can also use `id` to target element, but it's less common:

```css
#some-id {}
```

#### Combining selectors

We can use more than one selector in a CSS rule.

Let's say that we want to target all links inside an element with the class `footer`:

```css
.footer a {}
```

Or we can target `div` elements, but only the ones that have a class `special`

```css
div.special {}
```

In the examples above is important to notice the use or the lack of the space between elements.

Read more about it here: 

- [CSS Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)
- [CSS Combinators](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors#combinators)

### CSS Units

There are lots units in CSS that we can use to change to size elements or to control certain properties.

The ones that we are going to use often are:

- `px` - pixel
- `%` - percentage
- `em`
- `rem` - root em
- `vw` - viewport width
- `vh` - viewport height

Each unit has its use and it's important to choose the right one for different use cases.

#### Pixels

`px` is the most common CSS unit but nowadays is the one used the least. It'a an absolute unit, so when specifying a value in `px`, that value is fixed and the element in question doesn't adapt to, for example, different screen sizes or user preferences.

It's still very common to use it for:

- borders
- border radius
- sometimes margin and padding
- in specific use cases, to set the width or the height of certain elements, but these cases need to be treated as exceptions to the rule

#### Percentages

Very common to use it with container elements on the page and to create layouts that adapt to the page. This is a topic we'll go back in the future when talking about responsive design.

Also common to use it on images that are inside other elements, for example

```html
<div class="container">
    <img class="picture" src="...">
</div>
```

```css
.picture {
    width: 100%;
}
```

Giving a width `100%` it will make sure that the picture fits nicely inside of the container, whatever width it has.

### em and rem

These properties are commonly used for `font-size`, `margin` and `padding`

When we specify the `font-size` of an element in `em`, to know the final font size, we have to look at the parent element.

```html
<div class="container">
    <p>A paragraph</p>
</div>
```

```css
p {
    font-size: 1.5em;
}
```

The final `font-size` of the paragraph will be `1.5` multiplied the `font-size` of the parent element. If that element doesn't have a specific font-size, we look up the hierarchy of elements

When we specify the `font-size` in `rem`, the size is calculated by multiplying the rem value by the font-size of the root element, typical the `<html>` tag.

If the root element doesn't have a fixed size, the default value set in the browser will be used. This value is often `16px`.

### Viewport units

`vw` and `vh` are similar to percentages but rather than working in relation to the container element, they always refer to the viewport.

Whatever value we use, it will be a percentage of the width or the height of the viewport.

For example, if we want to have a container that it's always `30%` of the height of the page, we can do it like so:

```css
.container {
    height: 30vh;
}
```

### Common CSS properties

Changing background color: 

```css
background-color: green;
background-color: #123456;
background-color: rgb(200, 128, 231);
```

Changing text color:

```css
color: #abcdef;
color: tomato;
color: rgb(200, 100, 50);
```

Setting the font size:

```css
font-size: 1.5em;
font-size: 2.5rem;
font-size: 0.75rem;
```

Setting the width and height of elements:

```css
.box {
    width: 100px;
    height: 100px;
}

.picture {
    width: 100%;
}

.container {
    width: 80%;
}

.section {
    height: 100vh;
}
```

Setting the border of an element:

```css
/* an element with a 1px border all around */
.box {
    border: 1px solid tomato;
}

/* an element with a border on the top left corner */
p {
    border-left: 3px solid black;
    border-top: 3px solid black;
}

/* an element with a border only at the bottom */
.link {
    border-bottom: 3px solid red;
}
```

Making rounded corners on elements:

```css
/* rounded corner box */
.box {
    border-radius: 1em;
    border: 3px solid tomato;
}

/* same, but even more rounded */
.box-1 {
    border-radius: 1.5em;
    border: 3px solid tomato;
}

/* to create a circle, we first need a square and then use a radius of 50% */
.circle {
    border: 3px solid tomato;
    border-radius: 50%;
    height: 100px;
    width: 100px;
}
```