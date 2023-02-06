# Cascade, specificity and inheritance

CSS stands for Cascading Style Sheet. The word "cascading" refers to something that behave like a waterfall, from top to bottom.

In the context of CSS this means that the browser reads the styles we create from top to bottom and every time there are 2 or more rules that are in conflict with each other, maybe because they are trying to change the same property for the same element, the rule that appears at the bottom will override the one appearing at the top.

For example:

```html
<div class="box green"></div>
```

```css
.box {
    background-color: tomato;
    height: 100px;
    width: 100px;
}

.green {
    background-color: green;
}
```

In the example above there's a `div` with 2 classes and both these 2 classes are trying to set a `background-color` for the element. Since the class `green` appears after the `box` class, the `div` will be green.

This default behaviour is often changed by the `specificity` rules.

## CSS specificity

Each style declaration in CSS has a different **specificity**. CSS rules with higher specificity will override the ones with lower specificity, ignoring the cascade rules mentioned above.

The specifity of a CSS rule is made of by 3 values, for example: `(0, 1, 2)`

- the first value indicates the number of `id` selectors in the rule 
- the second value indicates the number of `class` selectors in the rule 
- the third value indicates the number of `type` selectors in the rule 

Let's see this through a few examples:

```css
/* 1 class: (0, 1, 0) */
.box {}

/* 1 class, 1 type: (0, 1, 1) */
.container a {} 

/* 1 id: (1, 0, 0) */
#main-title {} 

/* 1 id, 1 type: (1, 0, 1) */
#main-title span {} 

/* 2 classes: (0, 2, 0) */
.container .profile-picture {} 
```

What's important to understand is that the numbers on the left, weight more than the ones on the right, meaning that:

- an `id` is more important than `class` and `type`
- `class` is more important than `type`

This means that even if a rule has 100 or more classes (even though it's unrealistic), a rule with a single `id` will override it.

For example:

```html
<div id="some-id" class="class1 class2 class3"></div>
```

```css
/* (1, 0, 0) */
#some-id {
    background-color: green;
}

/* (0, 3, 0) */
.class1.class2.class3 {
    background-color: red;
}
```

The `div` in the example above will be green. Basically, a rule with an `id` is hard to beat, and this is one reason why we tend to avoid using `id` in CSS.

### Resources

- [Specificity calculator](https://specificity.keegan.st/)

## Inheritance

In CSS there is a distinction between `inherited` and `non-inherited` properties.

An `inherited` property will receive its values from a parent element.

Let's try to understand it with an example:

```html
<div class="container">
    <h2>Some title</h2>
    <p>Some text...</p>
    <p>Some more text...</p>
</div>
```

```css
.container {
    color: blue;
}
```

In the example above, we're specifying a text color only for the `.container`. What happens is that all the children elements in the container will **inherit** the color as well, because `color` is an `inherited` property.

Some `inherited` properties are:

- `color`
- `font` properties
- `list-style` properties
- `text` properties, such as `text-align`

Other properties like `border`, for example, are `non-inherited`.

On the `mdn` page for each property is specified whether a property is `inherited` or not.
