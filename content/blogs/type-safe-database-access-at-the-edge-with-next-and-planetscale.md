---
title: Type-Safe Database Access at the Edge with Next 13 & PlanetScale
subtitle: Read and render typesafe data at the Edge in Next 13
description: One of the most exciting new developments in computing is the Edge. This blog will walk you through leveraging geo location edge headers to connect to a PlanetScale database as close as possible to the requesting user. 
category: Nuxt
published: true
createdAt: '2022-10-30T23:22:29.628Z'
---

## Intro

It's been a crazy week in the world of web development! [Next 13's release](https://nextjs.org/blog/next-13) has brought in an exciting new paradigm for developing websites using **React Server components (RSCs), Next layouts** and more. 

What I'm ***most*** excited about are the new data fetching patterns introduced that allow you to fetch data directly in React Server Components, even going as far as connecting directly to your database. 

After going semi-viral Tweeting: <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Don&#39;t mind me dawg, just fetching and rendering at the edge with <a href="https://twitter.com/planetscaledata?ref_src=twsrc%5Etfw">@planetscaledata</a> &amp; <a href="https://twitter.com/nextjs?ref_src=twsrc%5Etfw">@nextjs</a> 13. <a href="https://t.co/a9Ewpw20Fh">pic.twitter.com/a9Ewpw20Fh</a></p>&mdash; David Parks (@dparksdev) <a href="https://twitter.com/dparksdev/status/1585702294296743936?ref_src=twsrc%5Etfw">October 27, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> I brainstormed some ways I could extend this further. 

There are two problems with the code above. One is that the data I am fetching using [PlanetScale's edge compatible serverless driver](https://planetscale.com/blog/introducing-the-planetscale-serverless-driver-for-javascript) is not typesafe ([thanks for pointing this out, Theo!](https://twitter.com/t3dotgg/status/1585747018932068352)), and also, I am not detecting the requests location in order to route it to a geographically closer database! 

While edge computing is super exciting (no cold starts, extremely low latency!), there are still some considerations you need to make when requesting data from an external data source. For example, if our Database is located in **Portland, Oregon** but we have users requesting our edge functions or edge rendered pages that fetch data in **Singapore**, the query needs to travel to Portland to our database, back to the Singapore edge function. If you cannot bring the data source as close to an edge node as possible, a lot of the latency benefits are nullified. If only we could somehow ***detect*** where the user is pinging our app from, and direct them to a read-only replica of our database that is as **close as possible geographically** to them. And on the dev side, do so in a type safe manner. 

Thanks to the amazing work done by Vercel, PlanetScale and the React team, this is entirely possible all without leaving your Next 13 code. Enter [PlanetScale portals](https://planetscale.com/blog/introducing-planetscale-portals-read-only-regions), Kysely, and Next 13's edge runtime. 

As always, if you'd prefer to just jump into the code visit the repository [here](https://github.com/DavidTParks/typesafe-db-access-next13) which mirrors what we will be implementing in this article.

<info-box :variant="'question'">
<h3 class="mt-0">Prerequisite:</h3>
In order to make use of PlanetScale Portals (global read replicas), you will need to enroll in a <strong>PlanetScale scalar plan</strong>. Keep in mind, the pattern I will lay out in this article is, in 99% of cases, an unnecessary optimization. You can get away fine with routing the user to a single database region. However, we want to over engineer the shit out of this and show what kind of speed is possible! So it will cost a bit. 
</info-box>

Let's go. 

## Setup

### PlanetScale

I'll skip over a decent amount of the PlanetScale setup since I covered this in [another article](https://davidparks.dev/blog/planetscale-deployment-with-prisma/), but make sure to enable the Serverless driver setting in your PlanetScale account. We'll be using **Prisma** purely for generating types from our schema for usage in Kysely, as well as pushing updates to PlanetScale, so make sure to enable those features as well. 

<imgix-image :alt="'Enable serverless setting in PlanetScale'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/type-safe-edge/serverless-setting.png'"></imgix-image>

Once you've upgraded your plan to Scalar, go ahead and create as many [read replica regions](https://planetscale.com/docs/concepts/regions#available-regions) as you want! Make sure to generate the connection details for the region and save for later. In this tutorial we'll be creating replicas in all the offered regions.

<imgix-image :alt="'Add a region in PlanetScale'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/type-safe-edge/region-add.png'"></imgix-image>

### NextJs & Prisma

Let's get started with Next! Go ahead and initialize a new Next 13 application with the experimental app directory by running 

```
npx create-next-app@latest --experimental-app
```

We'll need a few dependencies for this demo, one of which is the [Kysely PlanetScale Dialect](https://github.com/depot/kysely-planetscale) which will give us a type safe query builder around our database schema as well as `@planetscale/database`. 

Make sure to also initialize **Prisma**. We'll be setting up a PlanetScale compatible schema with a simple Model **Game** to query at the edge. 

```graphql
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

model Game {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  score     Float
  completed Boolean  @default(false)
}
```

Connect to your primary branch, and push your schema updates with 

```
npx prisma db push
``` 

Taking those connection details for each of your PlanetScale portal regions earlier, make sure to include the environment variables in your project in your `.env.local` file. I've used the following naming structure for this demo:

```
US_EAST_1_USERNAME=""
US_EAST_1_PASSWORD=""
US_WEST_2_USERNAME=""
US_WEST_2_PASSWORD=""
EU_CENTRAL_1_USERNAME=""
EU_CENTRAL_1_PASSWORD=""
EU_WEST_1_PASSWORD=""
EU_WEST_1_USERNAME=""
EU_WEST_2_USERNAME=""
EU_WEST_2_PASSWORD=""
AP_NORTHEAST_1_PASSWORD=""
AP_NORTHEAST_1_USERNAME=""
AP_SOUTHEAST_2_PASSWORD=""
AP_SOUTHEAST_2_USERNAME=""
AP_SOUTHEAST_1_PASSWORD=""
AP_SOUTHEAST_1_USERNAME=""
AP_SOUTH_1_USERNAME=""
AP_SOUTH_1_PASSWORD=""
SA_EAST_1_USERNAME=""
SA_EAST_1_PASSWORD=""
...
```

Now that we've got our config setup out of the way. Let's write some code!

### Kysely

Create a new file in `lib/db.ts` and start by importing **Kysely**, **Kysely PlanetScale Dialect**, and our `Game` table type from our Prisma client. Kysely PlanetScale Dialect will provide us with a type safe query builder around our serverless PlanetScale database. Let's also set up our types for our DB Read replicas, the Geolocations of our database regions, and our DB Kysely interface. We'll be storing the `longitude` and `latitude` of each of our database cities as well for comparison later.

```js
import { Game } from '@prisma/client';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface DbGeoLocation {
    latitude: number;
    longitude: number;
}
interface DB {
    Game: Game;
}
interface ConfigWithGeoLocation {
    dbConnection: Kysely<DB>;
    geoLocation: DbGeoLocation;
}

const connect = (username: string, password: string): Kysely<DB> => {
    return new Kysely<DB>({
        dialect: new PlanetScaleDialect({
            host: 'aws.connect.psdb.cloud',
            username,
            password,
        }),
    });
};

export const usWest2 = connect(
    process.env.US_WEST_2_USERNAME as string,
    process.env.US_WEST_2_PASSWORD as string,
);

export const usEast1 = connect(
    process.env.US_EAST_1_USERNAME as string,
    process.env.US_EAST_1_PASSWORD as string,
);

export const euCentral1 = connect(
    process.env.EU_CENTRAL_1_USERNAME as string,
    process.env.EU_CENTRAL_1_PASSWORD as string,
);

const euWest1 = connect(
    process.env.EU_WEST_1_USERNAME as string,
    process.env.EU_WEST_1_PASSWORD as string,
);

const euWest2 = connect(
    process.env.EU_WEST_2_USERNAME as string,
    process.env.EU_WEST_2_PASSWORD as string,
);

const apNorthEast1 = connect(
    process.env.AP_NORTHEAST_1_USERNAME as string,
    process.env.AP_NORTHEAST_1_PASSWORD as string,
);

const apSouthEast1 = connect(
    process.env.AP_SOUTHEAST_1_USERNAME as string,
    process.env.AP_SOUTHEAST_1_PASSWORD as string,
);

const apSouthEast2 = connect(
    process.env.AP_SOUTHEAST_2_USERNAME as string,
    process.env.AP_SOUTHEAST_2_PASSWORD as string,
);

const apSouth1 = connect(
    process.env.AP_SOUTH_1_USERNAME as string,
    process.env.AP_SOUTH_1_PASSWORD as string,
);

const saEast1 = connect(
    process.env.SA_EAST_1_USERNAME as string,
    process.env.SA_EAST_1_PASSWORD as string,
);

const dbConnectionsWithGeoLocation: ConfigWithGeoLocation[] = [
    {
        // Frankfurt
        dbConnection: euCentral1,
        geoLocation: {
            latitude: 50.110924,
            longitude: 8.682127,
        },
    },
    {
        // Dublin
        dbConnection: euWest1,
        geoLocation: {
            latitude: 53.35014,
            longitude: -6.266155,
        },
    },
    {
        // London
        dbConnection: euWest2,
        geoLocation: {
            latitude: 51.507359,
            longitude: -0.136439,
        },
    },
    {
        // Portland, Oregon
        dbConnection: usWest2,
        geoLocation: {
            latitude: 45.523064,
            longitude: -122.676483,
        },
    },
    {
        // Northern Virginia
        dbConnection: usEast1,
        geoLocation: {
            latitude: 37.926868,
            longitude: -78.024902,
        },
    },
    {
        // Tokyo
        dbConnection: apNorthEast1,
        geoLocation: {
            latitude: 35.6762,
            longitude: 139.6503,
        },
    },
    {
        // Singapore
        dbConnection: apSouthEast1,
        geoLocation: {
            longitude: 103.851959,
            latitude: 1.29027,
        },
    },
    {
        // Sydney
        dbConnection: apSouthEast2,
        geoLocation: {
            longitude: 151.2099,
            latitude: -33.865143,
        },
    },
    {
        // Mumbai
        dbConnection: apSouth1,
        geoLocation: {
            longitude: 72.877426,
            latitude: 19.07609,
        },
    },
    {
        // Sao Paulo
        dbConnection: saEast1,
        geoLocation: {
            longitude: -46.62529,
            latitude: -23.533773,
        },
    },
];
```

## GeoLocation 

Now comes the fun part. How do we leverage the `longitudes` and `latitudes` provided by `next/headers` and as well as the `geolocation` helper from the `@vercel/edge` package to find the closest read-only database replica to our request? 

After doing some digging, we need to calculate a distance commonly referred to as **"Crow flies distance"**, or the ***shortest straight line distance*** from point A to point B. We'll be looping through each of our database configs, calculating the crow flies distance between the request longitude and latitude with the database geo-location, and tracking what our closest config is.

The beauty of the edge runtime is that we still have access to [`Math` V8 primitives](https://vercel.com/docs/concepts/functions/edge-functions/edge-functions-api#v8-primitives) (among other APIs), so we can use [a simple formula](https://stackoverflow.com/a/18883819) to calculate the distance between our request location, and the read-replica database location.

Create a new file in `helpers` called geoLocation

```ts
// helpers/geoLocation
// Calculate the crows distance between two geo locations
export function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

// Value to radians
function toRad(value: number): number {
    return (value * Math.PI) / 180;
}
```

Hop back over to our `lib/db.ts` file, and let's import `calcCrow` 
```ts
import { calcCrow } from 'helpers/geoLocation';
```

And create a function that performs our calculation and looping. We'll default to **usWest2**, and initialize our closest distance to the `MAX_SAFE_INTEGER`

```ts
// lib/db.ts
const dbConnectionsWithGeoLocation: ConfigWithGeoLocation[] = [
  //...
]
// ...
export const closestDbConnection = (
    longitude: string | number,
    latitude: string | number,
): Kysely<DB> => {
    let closestConnection = usWest2;
    let closestDistance = Number.MAX_SAFE_INTEGER;

    dbConnectionsWithGeoLocation.forEach((config) => {
        const distanceBetweenLocationAndConfig = calcCrow(
            parseFloat(latitude.toString()),
            parseFloat(longitude.toString()),
            config.geoLocation.latitude,
            config.geoLocation.longitude,
        );

        if (distanceBetweenLocationAndConfig < closestDistance) {
            closestConnection = config.dbConnection;
            closestDistance = distanceBetweenLocationAndConfig;
        }
    });
    return closestConnection;
};
```

## Edge Functions

Phew. Now that all the grunt work is out of the way, it's time to put this all into action. First, let's create a default edge function that will be using our default `usWest2` config so we can **benchmark our performance globally** compared to the function which will be swapping our DB connection at the edge. 

Create `pages/api/default.ts`

```ts
import { usWest2 } from 'lib/db';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler() {
    const games = await usWest2.selectFrom('Game').selectAll().execute();

    return new Response(JSON.stringify({ games }), {
        status: 200,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'access-control-allow-origin': '*',
        },
    });
}
```

Once you deploy this to Vercel (don't forget to set your Environment variables!), we'll be using [KeyCDN's tool](https://tools.keycdn.com/performance) to test our endpoint. If you paste in the deployed Vercel URL with `/api/default` you can test the endpoint globally. Here's about the perf I am getting without swapping our connection at the edge. 

<imgix-image :alt="'Default edge perf'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/type-safe-edge/edge-perf-defualt.png'"></imgix-image>

Not bad! But we can go **faster**. 

Create a new endpoint in `pages/api/edge-swap-db.ts` that imports our `closestDbConnection` helper, using the `geoLocation` helper from `@vercel/edge` to extract our requests longitude and latitude, passing it in and finding our closest connection. 

```ts
import { geolocation } from '@vercel/edge';
import { closestDbConnection } from 'lib/db';

export const config = {
    runtime: 'experimental-edge',
};

export default async function handler(req: Request) {
    const { longitude, latitude } = geolocation(req);

    const games = await closestDbConnection(longitude ?? '0', latitude ?? '0')
        .selectFrom('Game')
        .selectAll()
        .execute();

    return new Response(JSON.stringify({ games }), {
        status: 200,
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'access-control-allow-origin': '*',
        },
    });
}
```

Trigger a redeploy, and test this new endpoint on **KeyCDN**

<imgix-image :alt="'Swapped edge perf'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/type-safe-edge/edge-perf-swap.png'"></imgix-image>

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/lXu72d4iKwqek" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/timanderic-tim-and-eric-wareheim-lXu72d4iKwqek">via GIPHY</a></p>

**Bruh**

But wait, there's more!!

##  Server Components

Our examples above were using Edge functions, but we want to use Next 13! Thankfully, the `headers` object from the `next/headers` import can provide us our `longitude` and `latitude` in React Server Components, so we can use this same function. 

First sure your `next.config` has these experimental options enabled.

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        runtime: 'experimental-edge',
    },
};

module.exports = nextConfig;
```

In our shiny new `app` folder, create a `page.tsx` file alongside a simple root layout, and let's do some data fetching with our edge db config!

```ts
// app/page.tsx
import { headers } from 'next/headers';
import { closestDbConnection } from 'lib/db';

async function getData() {
    const longitude = headers().get('x-vercel-ip-longitude') ?? '0';
    const latitude = headers().get('x-vercel-ip-latitude') ?? '0';

    const games = await closestDbConnection(longitude, latitude)
        .selectFrom('Game')
        .selectAll()
        .execute();

    return games;
}

export default async function Page() {
    const games = await getData();
    return (
        <div>
            {games.map((game) => (
                <>{game.score}</>
            ))}
        </div>
    );
}
```

You'll notice in your code editor, we get type safety and auto completion in our templates for the previous work we did with *Kysely*! Pretty awesome. 

Keep in mind, since we are using our DB client directly and not `fetch`, the code above is similar to `getStaticProps` in Next < 13. If you want to revalidate the data on an interval, you could use a [Segment Cache Configuration](https://beta.nextjs.org/docs/data-fetching/fetching#segment-cache-configuration) like 

```ts
export const revalidate = 3600; // revalidate every hour
```

## Wrap up

Well there you have it. We have utilized **PlanetScale Portals**, **PlanetScale's Serverless Driver**, **Kysely**, and **Next 13** to detect where a request is coming from, and swap our DB connection at the edge to bring our data source as close as possible to the edge node, in a type safe manner!

If you want to check out the code, [visit the repository here](https://github.com/DavidTParks/typesafe-db-access-next13). 

Thanks for reading!