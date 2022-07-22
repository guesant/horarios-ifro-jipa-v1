This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Demo

You can check the production service running in <https://horarios-ifro-jipa.vercel.app/>.

## Getting Started

First, get the code with git:

```sh
git clone https://github.com/guesant/horarios-ifro-jipa.git
cd horarios-ifro-jipa
```

```sh
cp .env.example .env
```

Start the proxy server:

```sh
(cd services/proxy; yarn start)
```

In a new terminal tab, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
