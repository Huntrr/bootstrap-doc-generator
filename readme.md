# Bootstrap docs-esque generator

Nifty little script for generating static webpages resembling the bootstrap
docs.

## Usage

To use, create a folder to contain your sections and subsections. Examples for
Penn’s Code Weekend are in `2016s` and `2015f`. Essentially, each
subfolder is a `category`. Each `.md` or `.html` file contained therein is
a `subcategory` with content. Running `node run.js <FOLDER>` will spit out your
static page in `www`.

## Customization

Customization is severely lacking right now. That’ll change... Probably.

For now, you can poke in `src` to see the template pages used during generation
(you might, for example, want to edit the nav bar in `head.html`). Additionally,
all content files (like css and javascript) are stored in `www`, so if you want
to, for example, change the styling, check `www/css`.
