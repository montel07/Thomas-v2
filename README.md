# Portfolio v2

A soft, interactive glass desktop for exploring my work. Open a window from the dock, drag it by its title bar on desktop, and change the atmosphere with the mood control.

## Preview

[Visit Here](https://thom-port-v2.vercel.app)

## Files

- `index.html` — portfolio content and navigation
- `style.css` — layout, refractive glass styling, colour moods and responsive behaviour
- `script.js` — windows, dock, clock, notifications and interactive bubbles
- `images/` — project previews
- `files/` — downloadable writing sample

## Run it

Open `index.html` in a modern browser, or serve this folder with any static web host.

## Interaction notes

- The bubbles have different touch responses: split, water-like deformation, ripples and sparkles.
- The glass uses layered highlights and chromatic edge lighting as a broad fallback. Browsers that support SVG displacement filters get additional backdrop bending on focused windows and the dock.
- Reduced-motion and reduced-transparency preferences are respected.
- On phones, windows become a single scrollable sheet and the dock adapts to the available width.

## Editing

- **Words and links:** edit the matching `<section class="win">` in `index.html`.
- **Colours:** edit the mood variables at the top of `style.css`.
- **New window:** add a window section and a dock control with the matching `data-open` value.

## Browser support

Works in current versions of Chrome, Edge, Safari and Firefox on desktop and mobile. 

## Contact

- GitHub: [montel07](https://github.com/montel07)
- TikTok: [@re_incarnate](https://tiktok.com/@re_incarnate)
- X: [@hazreith](https://x.com/hazreith)
- Discord: reincarnate07

