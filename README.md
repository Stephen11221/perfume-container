# Sillage Perfume Storefront

A responsive fragrance storefront built with React and Vite. Browse scent families, search fragrance houses and notes, save favorites, add products to a shopping bag, and adjust quantities in the cart drawer.

## Run locally

```sh
npm install
npm run dev
```

## Tests and checks

```sh
npm test
npm run lint
npm run build
```

## Run with Docker

```sh
docker compose up --build
```

The storefront is available at `http://localhost:8080`. Set `PORT` to change the host port, for example `PORT=3000 docker compose up --build`.

To build the image without Compose:

```sh
docker build -t sillage-storefront .
docker run --rm -p 8080:80 sillage-storefront
```

Product and hero photography is loaded from Unsplash. Checkout is a front-end placeholder; no payment or order service is connected.
