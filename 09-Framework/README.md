# Framework 2 Days

## Bootstrap

### Breakpoints


- `no prefix`: Extra small `<576px`
- `sm`: Small `≥576px`
- `md`: Medium `≥768px`
- `lg`: Large `≥992px`
- `xl`: Extra large `≥1200px`
- `xxl`: Extra extra large `≥1400px`

Read more: https://getbootstrap.com/docs/5.3/layout/breakpoints/

### Containers

- `.container`: has a max-width at each breakpoint
- `.container-{breakpoint}`: width 100% until the specified breakpoint
    - `.container-sm`
    - `.container-md`
    - ...
- `.container-fluid`: width 100% at all breakpoints

#### Responsive containers:
```html
<div class="container-sm">100% wide until small breakpoint</div>
<div class="container-md">100% wide until medium breakpoint</div>
<div class="container-lg">100% wide until large breakpoint</div>
<div class="container-xl">100% wide until extra large breakpoint</div>
<div class="container-xxl">100% wide until extra extra large breakpoint</div>
```

Example: 
- [Grid example](https://getbootstrap.com/docs/5.3/examples/grid/#containers)

Read more: https://getbootstrap.com/docs/5.3/layout/containers/

### Bootstrap Grid

The grid system in Bootstrap is done with `flexbox`

By default, the grid system divides a row in 12 columns.

To use the grid, we need: 

- an element with class `row`
- one or more elements with class `col`, `col-{n}`, or `col-{breakpoint}-{n}` 

For example:

```html
<div class="container text-center">
  <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
</div>
```

This creates a row automatically divided in 3 columns of equal size.

The `container` element is not necessary, but it's always useful to have it, to limit the width of the content.

Controlling the size of columns:


```html
<div class="container text-center">
  <div class="row">
    <div class="col">
      Column
    </div>
    <div class="col-8">
      Column
    </div>
    <div class="col">
      Column
    </div>
  </div>
</div>
```

Here the column in the middle will occupy 8 of the 12 columns available. The remaining space will be taken by the remaining columns.

Read more:
- Grid: https://getbootstrap.com/docs/5.3/layout/grid/
- Columns: https://getbootstrap.com/docs/5.3/layout/columns/
- Gutters: https://getbootstrap.com/docs/5.3/layout/gutters/

### Utilities

- Typography: https://getbootstrap.com/docs/5.3/content/typography/
- Images: https://getbootstrap.com/docs/5.3/content/images/
- Sizing: https://getbootstrap.com/docs/5.3/utilities/sizing/
