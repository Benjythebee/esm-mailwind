# Mailwind
Use Tailwind CSS to design HTML emails.

This project is based of 'mailwind' developped by @soheilpro. However, I had a few problems when using mailwind. So I made this esm-friendly version to satisfy my needs.

## Difference with solheilpro/mailwind

| Features | esm-mailwind      | mailwind |
| ----------- | ----------- | ----------- |
| Parse tailwind html | ✔️  | ✔️  |
| Parse tailwind config | ✔️  | ✔️  |
| Convert 'rem' to 'px' | ✔️  | ❌  |
| Resolves CSS variables | ✔️  | ❌  |
| ESM-friendly | ✔️  | ❌  |
| Support Handlebars | ✔️  | ❌  |

## Install
```
npm install esm-mailwind --save-dev
```

or if you want to install globally:

```
npm install esm-mailwind -g
```

## Usage

Design your HTML email using the Tailwind utility classes like you normally would for the web.

Then run the following command to generate the corresponding CSS file:

```
mailwind --input-html email.html --output-css style.css
```

Or run this command to generate an inlined HTML file:

```
mailwind --input-html email.html --output-html email-inlined.html
```

If you want to specify your own base pixels per 1rem:

```
mailwind --input-html email.html --output-html email-inlined.html --base-px 16
```


## Options

`--input-css`

The path to your base CSS file. Use this if you need to write custom CSS. Defaults to [style.css](./src/style.css).

`--input-html`

The path to your HTML email file.

`--output-css` (optional)

The path to the CSS file that will be generated.

`--output-html`

The path to the inlined HTML file that will be generated.

`--tailwind-config` (optional)

The path to your custom Tailwind configuration file. Defaults to [tailwind.config.js](./src/tailwind.config.js).

`--base-px` (optional)

The base number of pixels per 1rem; default = 16.

## Note

In the provided default config file, all the units are changed to pixel which is probably what you want for HTML emails.

## Example

Given an `email.html` file with this content:

```html
<html>
  <body>
    <p class="font-bold text-lg">Welcome</p>
  </body>
</html>
```

running this command:
```
mailwind \
  --input-html email.html \
  --output-css style.css \
  --output-html email-inlined.html
```

will generate the following CSS and inlined HTML files:

```css
.text-lg {
  font-size: 18px
}

.font-bold {
  font-weight: 700
}
```

```html
<html>
  <body>
    <p class="font-bold text-lg" style="font-size: 18px; font-weight: 700;">Welcome</p>
  </body>
</html>
```

## Version History
+ **1.0.0**
  + ESM support
  + Parse CSS variables
  + Add rem to px conversion

### Version history before Fork of mailwind:
+ **2.2**
	+ Tailwind CSS is now a peer dependency so you can `npm install` newer versions if you need to (Thanks [Songkeys](https://github.com/Songkeys))
+ **2.1**
	+ Colors are now generated without using CSS variables
	+ Upgrade to Tailwind CSS v3.2
+ **2.0**
	+ New design
	+ Upgrade to Tailwind CSS v3
+ **1.0**
	+ Initial release

## Author
**Benjy Larcher** 

+ https://benjylarcher.com
+ http://twitter.com/benjythebee
+ http://github.com/benjythebee

With credit due to:
- Roheil Rashidi ( [soheilpro](https://github.com/soheilpro) )
- Jakob Heuser ( [Jakoto](https://github.com/jakobo) )

