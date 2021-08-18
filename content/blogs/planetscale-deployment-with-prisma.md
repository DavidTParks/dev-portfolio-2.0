---
title: Deploying a PlanetScale, Next.js & Prisma App to Vercel
subtitle: Learn how to use Prisma with PlanetScale, and deploy it to Vercel!
description: PlanetScale is an exciting new DBaaS geared towards serverless environments. They recently released connection string support with makes integration with Prisma a breeze. We'll learn how to spin up a new Next.js & Prisma project, connect it to PlanetScale, and deploy it to production on Vercel. 
category: Serverless, Next
published: true
createdAt: "2021-08-16T23:22:29.628Z"
---

## Intro

When exploring serverless database solutions, there's only a few out there right now that pair nicely [Prisma](https://www.prisma.io/). You can use a traditional DBaaS platform like Amazon RDS or Heroku, but without employing some sort of connection pooling using a tool like [PgBouncer](https://www.pgbouncer.org/) you will find that your database will quickly exhaust it's connection limit and take down your entire app due to [serverless limitations](https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#the-serverless-challenge). If only there was a database solution out there that integrated seamlessly with Prisma, and did not have to worry **at all** about managing concurrent connections! Enter [Planetscale](https://planetscale.com/).

<info-box :variant="'question'">
<h3 class="mt-0">What's PlanetScale?</h3>
Based on <a target="_blank" href="https://vitess.io/ " rel="noopener noreferrer">Vitess</a>, PlanetScale is a new DBaaS platform that allows you to spin up a database in seconds, without having to worry at all about connection management. Vitess is the same technology that powers many hyperscale websites that <strong>require</strong> critical uptime, performance and scalability. PlanetScale have also introduced some really cool concepts like database branches (similar to Git branching logic) so your database migrations are seamless and non-blocking.
</info-box>

In this article, we'll go over how to create a brand new **Next.js** **Prisma** application, connect it to **PlanetScale** using their [newly released connection string options](https://planetscale.com/blog/connect-any-mysql-client-to-planetscale-using-connection-strings), issue a simple deploy request using PlanetScales non-blocking schema change workflow, and then deploy it to production using **Vercel**. 

## Setup

### PlanetScale

Before we begin, go ahead and sign up for an account at [PlanetScale](https://planetscale.com/). Once you're all signed up, download the [PlanetScale CLI](https://planetscale.com/cli) which will be important for connecting to our database locally, creating new database branches, and [issuing deploy requests when we make changes to our schema](https://docs.planetscale.com/tutorials/automatic-prisma-migrations) using Prisma.

From your dashboard, click on the "Create database" button and enter a database name (I'll name mine tutorial-db), select a region, and deselect the launch tutorial database option. 

<info-box>
In a serverless application, it's important to select a database region that is as <strong>close as possible</strong> to where your application is being deployed in order to reduce latency. In my case, both my Vercel application and PlanetScale database will be in the Western U.S.
</info-box>

Excellent! Once your database is created, head over to the settings page and enable **Automatically copy migration data** which will store our Prisma schema migrations in a table called **_prisma_migrations** any time we merge a [deploy request](https://planetscale.com/blog/non-blocking-schema-changes).

<imgix-image :alt="'Screenshot showing the Prisma Migrations copy data feature'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/planetscale-prisma-next/planetscale-prisma-settings.png'"></imgix-image>

Awesome! Head back to your databases dashboard and you should see this view.

<imgix-image :alt="'Screenshot showing PlanetScale dashboard with tutorial database'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/planetscale-prisma-next/dashboard.png'"></imgix-image>

Now that we have our database setup with the copy Prisma migration data option enabled, go ahead and click on the **connect** button in the top right of your dashboard and generate a new password for your **main** branch.

<imgix-image :alt="'Screenshot showing connection string details for PlanetScale database'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/planetscale-prisma-next/connection-string.png'"></imgix-image>

Using the dropdown, select the **Prisma** format and make sure to save these connection details safely somewhere, as PlanetScale hides your password after the initial generation. (You can always generate a new password if you misplace these credentials, and delete the misplaced one). These are the details we will be using in our Prisma `DATABASE_URL` environment variable on Vercel during deployment.

Since Prisma migrations follow PlanetScales non-blocking schema migration workflow, we will need to create two additional branches off of our **main** database branch in order to handle these schema changes. This can be done easily with the **PlanetScale CLI**.

Go ahead and login to the PlanetScale CLI by issuing the following command in your terminal of choice:

```zsh
pscale auth login
```

Now that we are authenticated, let's create our two additional **development branches**:

```
pscale branch create tutorial-db initial-setup

pscale branch create tutorial-db shadow
```

In two separate terminals, connect to each of these database branches using the following commands:

```
pscale connect tutorial-db initial-setup --port 3309
```

```
pscale connect tutorial-db shadow --port 3310
```

### Next.js & Prisma

Now that we have our database and database branches setup and running, it's time to initialize our **Next.js** and **Prisma** application.

Spin up a new Next.js project using the following command:

```
npx create-next-app planetscale-prisma-next
```

`cd` into the new project directory and initialize Prisma using the following command:

```
npx prisma init
```

Modify the `.env` file in the root of your project like so:

```env
DATABASE_URL="mysql://root@127.0.0.1:3309/tutorial-db"
SHADOW_DATABASE_URL="mysql://root@127.0.0.1:3310/tutorial-db"
```

We will also need to make some PlanetScale-specific adjustments to our `schema.prisma` file located in our generated `prisma` folder in order to ensure platform compatibility. Edit our datasource and generate to enable **planetScaleMode**, include our **shadowDatabaseUrl**, and add **planetScaleMode** to our previewFeatures array.

```graphql
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
  planetScaleMode = true
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["planetScaleMode"]
}
```

For the sake of this tutorial, we will just be creating a simple Prisma model for a **Post** which we'll retrieve via a serverless function and the **Prisma Client**. We won't dive into the UI since what we're after is just demonstrating how to get setup and deployed. As a result, we'll be manually entering some data into our DB after we edit our schema. Add the following to our `schema.prisma` file:

```graphql
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
  planetScaleMode = true
}

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["planetScaleMode"]
}

model Post {
  id        Int      @default(autoincrement()) @id
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String
}
```

Now that we have our schema setup, let's generate our first Prisma migration!

```
npx prisma migrate dev --name init
```

If all goes well, we should see a success message in our terminal, as well as a new `migrations` folder in our project. Now, it's time to open a deploy-request to bring these changes over to our **main** database branch. 

```
pscale deploy-request create tutorial-db initial-setup
```

Woohoo! We've just created our first **PlanetScale deploy request**. If we head back over to our dashboard and navigate to our deploy requests tab, we should see an open deploy request for our schema changes.

<imgix-image :alt="'Screenshot showing an open deploy request on PlanetScale'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/planetscale-prisma-next/deploy-request.png'"></imgix-image>

Click on the **Add changes to deploy queue** button and if all goes well, our changes will be deployed to the main database branch!

Now that we have our main branch updated, go ahead and shut down both terminals that have been connected to PlanetScale, and let's rerun a command to open a connection to our **main** branch on port 3309, so we can add a **Post** record to our database.  

```
pscale connect tutorial-db main --port 3309  
```

Let's open a new terminal in our project and run `npx prisma studio` so we can open Prisma's web GUI to allow us to add a new Post record to our PlanetScale database. Click **Add record** from the toolbar and enter any sample data you'd like.

<imgix-image :alt="'Screenshot showing the Prisma Studio web GUI and adding a new post record'" :src="'https://davidparksdev.s3.us-east-2.amazonaws.com/planetscale-prisma-next/new-post.png'"></imgix-image>

Now that we have a database setup, our schema deployed to our main branch, and a sample **Post** added to our database, it's time to setup a **serverless function** to retrieve all of our posts. 

Since we are dealing with a **serverless** application, we want to avoid instantiating a new **Prisma Client** on every subsequent request to preserve connections, so let's create a new folder in the root of our project called `lib` and a file inside called `prisma.js` so we can export a reusable Prisma Client.

```javascript
import { PrismaClient } from '@prisma/client'

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma
```

Next, let's create a new file inside of our `api` folder in `pages/api` called `posts.js` and include the following:

```javascript
import prisma from "../../lib/prisma";

export default async function assetHandler(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {   
                const posts = await prisma.post.findMany();
                res.status(200).json(posts);
            } catch(e) {
                console.error("Request error", e);
                res.status(500).json({ error: "Error fetching posts" });
            }
            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
```

Now, if we visit `http://localhost:3000/api/posts` we should see our Post record fetched from our PlanetScale database!

## Deploying

Since we are deploying to **Vercel**, make sure that you are signed up and have your Github account connected to it. Once you have committed your files to Github, select the **new project** option on Vercel, and scroll down to the **environment variables** section.

Using the **connection string details** you saved earlier for our main branch, create a new environment variable for our `DATABASE_URL` with the connection string you saved earlier.

Since Vercel uses a specific linux distribution we need to make sure to edit our connection string to point to the correct certificate location, which is `/etc/pki/tls/certs/ca-bundle.crt`.

Your connection string environment variable should look something like:

`mysql://YOUR_USER:************@YOUR_HOST/tutorial-db?sslmode=require&sslcert=/etc/pki/tls/certs/ca-bundle.crt`

Go ahead and click deploy!

Once your application is deployed, if you navigate to the same `/api/posts` endpoint, you should see the data returned.

Congratulations, you have successfully deployed a **Next.js Prisma** application using **PlanetScale** as the database to **Vercel**!

## Wrap up

I hope this article was helpful to any developers out there looking to integrate PlanetScale into their technology stack, and deploy it to production using Vercel. The developer experience PlanetScale provides is fantastic and their support is unparalleled (special thanks to [Nick Van Wiggeren](https://twitter.com/NickVanWig) for helping me solve a problem I encountered writing this article).

If you want to look at the code used for this demo, check out the repository [here](https://github.com/DavidTParks/planetscale-prisma-next).

Thanks for reading!