# Lingzhi Yang — personal website

A static academic homepage for **https://lingzhi227.github.io/**.

## Content

The page has three sections: introduction, Projects, and Publications. There is no contact-links footer. All content is in `index.html`; visual styles are in `styles.css`. `site.js` handles the theme switch and active navigation.

## Preview

From this directory, run:

```sh
python3 -m http.server 8765
```

Then open http://localhost:8765/.

## Publish

GitHub Pages serves the `main` branch from the repository root. `.nojekyll` enables direct static-file serving. Updates pushed to `main` are published automatically.

## Images and fonts

Publication thumbnails are genuine overview-figure screenshots from the five supplied manuscripts. Project thumbnails come from their repositories and documentation. Asset provenance and crop information are recorded in `assets/publication-sources.json` and `assets/project-sources.json`.

The profile image is the owner's existing public GitHub avatar. Roboto is self-hosted under the SIL Open Font License; see `assets/fonts/OFL.txt`.

Layout inspiration: [Matthew Y. C. Cheung's homepage](https://matthewyccheung.github.io/). The implementation is a lightweight static site; no Jekyll build or third-party JavaScript is required.
