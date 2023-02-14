# Table

- `<table>` element
- `<tr>`, table row element
- `<th>`, `<td>`, table header and table data element
- `scope` attribute: to specify if a header is referred to a column or a row
    - `col`
    - `row`
- `colspan` and `rowspan` attributes: to specify how many columns and rows a certain cell should occupy
- `border-collapse`
    - `separate` (default)
    - `collpase` 
- `border-spacing`: to increase the space between each cell
  - it works only when `border-collapse` is set to `separate`
- semantic table elements:
  - `<thead>`
  - `<tbody>`
  - `<tfoot>`
- `<caption>`: to add a description for the table
- `caption-side`: to specify if the caption should appear at the top or bottom of the table