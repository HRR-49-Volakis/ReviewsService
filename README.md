# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
## CRUD

API:

Create: /api/reviews
  >uses method insertReview and generates one review record using faker data

Read: /api/reviews
  >retrieves all reviews from reviews table

Update: /api/reviews
  >uses method updateReview to update the author via arguments at the given id

Delete: /api/reviews
  >uses method deleteReview to delete a review via arguments at the given id
