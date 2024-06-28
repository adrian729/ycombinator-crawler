# YCombinator News Crawler

Demo project scrapping a small set of YCombinator news and displaying them.

To see the result go to [https://ycombinator-crawler.vercel.app](https://ycombinator-crawler.vercel.app/).

Project repository at [@adrian729/ycombinator-crawler](https://github.com/adrian729/ycombinator-crawler).

## Tech Stack and decisions

### Hosting, Framework and Database

I wanted to be able to do a small demo that can be shown without installing or running anything, and that could be hosted for free.

That is why I chose Next.js with **Vercel**, and to use the **PostgreSQL** database that it offers with the free plan.

It is also a no brainer for deployments if used together with **GitHub**.

### Automatic checks

Simple pipeline that runs the tests, linter and formatter on commit, push and pull request using **husky** with **lint-staged** and **GitHub Actions**.

### Testing

I decided to add only some Unit Testing for the logic of the application, since the UI is very simple and the main part of the project is in the data parsing.

To do so I chose **Jest** since it is more than capable to do the job and I have used it before.

To mock fetching data I used the [Mock Service Worker API](https://mswjs.io/), I didn't know about it but it seemed like a good fit.

### Parsing

For parsing I only knew **jsdom**, so I did some research and it seemed like [Cheerio](https://cheerio.js.org/) would be a better option, it seemed more lightweight and faster.

Other options like **Puppeteer** seemed like an overkill for this project.

If I had to do it again I would probably use **jsdom** or check out other options. Cheerio's documentation is still a work in progress and it has features that don't seem to be working yet.

#### Data parsing logic

-   **@/lib/utils/parse.ts**: parsing logic, it uses Cheerio to parse the HTML and return the entries data.
-   **@/lib/utils/filter.ts**: filtering the entries.

### Styling

I decided to use **TailwindCSS** since I like it and thought it made sense in this specific scenario. I think it works well with frameworks like React that organize the UI in components. The main point of the project was not the UX/UI so the styling is not really fancy.

### Project Structure

The main structure is based in the default structure for projects with Next.js 14, but keeping pages and ui separated.

-   **app**: pages and layouts. Routing automatically based on app directory files structure.
-   **lib**: logic and data parsing.
-   **ui**: components and styles.

## Web Page

-   **/**
    -   fetching, parsing and filtering of the news directly from the ycombinator page. Allows to select desired filter and see the results live.
-   **/request**
    -   Shows the available logged requests from the database.
    -   Clicking any of the request items from the list will redirect to **/request/\[id\]** to see the details of the request.
    -   The form allows to add a new request to the database, with the selected filter, which will display in the list after submitting.
-   **/request/\[id\]**
    -   Displays the selected request entries. It will display them sorted by **rank**.
    -   _To see the original order, depending on the filter, go to the live page at **/**. This page just shows the request information and the stored entries._

## Run Locally

### Install

```bash
pnpm install # or npm install or similar tools
```

Open [http://localhost:3000](http://localhost:3000) (or the port it says in the terminal) in the browser to see the project

### Run

```bash
pnpm dev # or npm run dev or similar tools
```

### Test

```bash
pnpm test # or npm run test or similar tools
```

### Lint

```bash
pnpm lint # or npm run lint or similar tools
```

### DB

The database is hosted in Vercel, to run it locally you will need to link it to a Vercel project and run the seed script

```bash
pnpm seed # or npm run seed or similar tools
```

## To improve

Things I would have liked to do but didn't have time for:

-   **DB**: Add a way to run the database locally.
-   **Testing**:
    -   Finish testing all the logic.
    -   Add tests for components and e2e/integration testing.
-   **UI/UX**:
    -   Add static/dynamic rendering of components and pages.
    -   Add placeholders when fetching for data and loading.
    -   Better styles, light/dark mode.
-   Refactoring and clean-up code (some renaming, better separation of concerns, etc).
-   **Extra**:
    -   Add cron job to fetch data periodically.
