# Hackernews news reader

Hackernews News reader with possibility to filter through the last 500 top articles, select facets and

## Prerequiresites

```bash
	NodeJS: https://nodejs.org/en/download/
```

## Installation

```bash
	git clone LINK_TO_GIT
  yarn install
  yarn run dev
```

## Testing

```bash
  yarn run test  (for unit test)
	yarn run test:watch  (for unit test in watch mode)
	yarn run test:coverage  (for unit test with coverage)
  yarn run cy:open    (for integration tests)
```

## Objective
1) Make a basic boilerplate for React/Redux
2) Prove TDD / unit testing

## Functionalities
The app retrieves latest news from Hackernews and get the info for those.
The list is displayed on the main page.
The user can filter by typing into the search bar and can hide unwanted elements.
Hidden elements are listed on the sidebar and can be restored.


## Things to improve
1) Lazy loading
2) Additional filters / sort by
