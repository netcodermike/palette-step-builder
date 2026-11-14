# Palette Step Builder

Generate intermediate hex colors and report each swatch’s relative luminance.

![Sample run from Palette Step Builder](docs/demo.webp)

## Run

Install Node.js 22 or newer. Run these commands from the repository root.

```sh
node app.mjs sample.json
```

Replace `sample.json` with a JSON file following the same structure. The app prints a JSON report to standard output.

Supply two #RRGGBB colors and 2 to 32 steps including both endpoints. Interpolation runs in linear light before conversion back to sRGB.

## Verify

Run `python check.py` with Python 3.11 or newer after the build step when applicable. The check verifies the bundled scenario and confirms that an invalid input returns an error.
