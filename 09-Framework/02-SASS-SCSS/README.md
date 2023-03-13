# SASS/SCSS

- `SCSS` (or `SASS`) is a language very similar to `CSS` 
- it adds lots of extra feature to CSS
    - the ability of nesting styles
    - splitting a big CSS file in multiple smaller files
    - creating variables (not that useful anymore)
    - functions
    - more...
- but it's **not** compatible with the browser
    - we can't create a SCSS file and add it to or `index.html` directly
    - we need an extra step where we `compile` the SCSS into standard CSS
    - the process then is: 
      - we write SCSS, using all of its fancy features
      - we use an external program to convert this file into standard CSS

## Installing SASS

- We'll use `npm` to globally install `SASS` into our system.
    we install it globally so that we can use it for every project

Let's open the terminal and write:

```plaintext
> npm install -g sass
> sass --version
```

## Our first SASS project

Let's create a simple website with an `index.html`, some text inside and some styles.

Content for the `index.html`

```html
<nav class="main-nav">
    <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Work</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</nav>
<div class="hero">
    <h1>Hi, my name is Sara<br />I am full-stack developer</h1>
    <p>I'm open for work: <a href="#">Hire me!</a></p>
</div>
<section class="about-section">
    <h2>About</h2>
    <p>
    Lorem ipsum dolor <a href="#">example.com</a> sit amet consectetur adipisicing elit. Similique
    sapiente, excepturi, blanditiis iusto ea maiores cumque tempore ipsam
    nemo eius nam, nulla fugit dolores assumenda ab deserunt voluptatibus
    quasi. Minus.
    </p>
</section>
<section class="work-section">
    <h2>Work</h2>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
    sapiente, excepturi, blanditiis iusto ea maiores cumque tempore ipsam
    nemo eius nam, nulla fugit dolores assumenda ab deserunt voluptatibus
    quasi. Minus: <a href="#">link1.com</a>, <a href="#">link2.com</a>, <a href="#">link3.com</a>.
    </p>
</section>
<section class="contact-section">
    <h2>Contact</h2>
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
    sapiente, excepturi, blanditiis iusto ea maiores cumque tempore ipsam
    nemo eius nam, nulla fugit dolores assumenda ab deserunt voluptatibus
    quasi. Minus.
    </p>
</section>
```

- create an `index.html` file and copy the content above inside
- create a `main.scss` file

Let's see some SCSS features in practice.

### Nesting

- I want all the links in my page to be color `tomato` and have the `underline`.
- but I want the links in the `.main-nav` to be `white`, larger and having no underline
- I want the `.main-nav` to have a background of `tomato`

I could write something like this:

```css
a {
    color: tomato;
}

.main-nav {
    background-color: tomato;
}

.main-nav a {
    color: white;
    font-size: 1.25em;
    text-decoration: none;
}
```

Using `SCSS` I could write:

```css
a {
    color: tomato;
}

.main-nav {
    background-color: tomato;
    a {
        color: white;
        font-size: 1.25em;
        text-decoration: none;
    }
}
```

- the second `a` appears **nested** inside the `.main-nav`
- this produces the same result as the regular `CSS` above, but it's shorter to write

## DCI Boilerplate

- Developers often work with a complex project setup and workflow
- Spending time to set up a workflow can save time in the long run
- Developers might use a boilerplate project
    - What does boilerplate mean here?
    - What boilerplate have we already used?
- Let's have a look at an example boilerplate: https://github.com/FBW23-E01A/DCI-boilerplate-1/blob/main/README.md
    - This uses sass and a thing called parcel
    - Sass you have already seen
    - Parcel is a configuration tool and web server
        - It's already been set up in the boilerplate
        - We don't need to understand it even!
- Let's clone the repo and talk about how it works

## NPM - Node Package manager

- The boilerplate is based on `npm` - you will use that a lot in the course
    - The most important file here is `package.json`
        - we can use it to install and keep track of project dependencies
        - and write custom scripts for our project

            ```json
            "scripts": {
                "hello": "echo 'hello I am a script'; ls"
            }
            // npm run hello
                ```

- We can control `package.json` by commands or direcly editing
    - Commands will be like `npm <something>`, kind of like with git
    - Let's say you want to use a tool called `uuid` in your project
    - You could add that as a dependency
        ```sh
        $ npm install uuid
        $ npm i uuid # the same thing
        ```
        - This works very similar to `apt`
        - This searches an online repository for "uuid"
        - It will download the latest version into `node_modules` folder
        - It will also add it into the `package.json`
        - The repository is: https://www.npmjs.com/
        - You can see details like: https://www.npmjs.com/package/uuid

    - If you just run `npm install` NPM will:
        - 1. look at `package.json`
        - 2. download and install all dependencies listed there

- So you can install things with npm globally or locally
    - `Global`: install something into your system (we installed sass)
    - `Local`: install something into your project (we installed uuid)

- When you install locally
    - The package is added to `package.json`
    - The package files are downloaded into `node_modules`

- When you install globally
    - The thing you install is usually usable from the terminal
    - The thing you install is downloaded into a special folder in your home

- One common issue with npm is version problems
- Old projects support only old versions
- You want to use the latest stable version
- It's fairly common to switch versions
- This is done with a tool called `nvm` - Node Version Manager