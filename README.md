## @brokenbyte-software/whois
A WHOIS client for NodeJS with various output formats

## Features
- **zero** dependencies!
- simple as possible

## Installion

* npm
```sh
npm i @brokenbyte-software/whois
```
* yarn
```sh
yarn add @brokenbyte-software/whois
```
* pnpm
```sh
pnpm install @brokenbyte-software/whois
```

## Usage
* TypeScript
```ts
import {whois, WellKnownKeys, ResultFormat} from '@brokenbyte-software/whois';

async function run () {
    const result = await whois('google.com', {format: ResultFormat.Object});
    console.log(result[WellKnownKeys.Whois]); // or console.log(result);
}

run();
```
* JavaScript
```js
const {whois, WellKnownKeys, ResultFormat} = require('@brokenbyte-software/whois');

async function run () {
    const result = await whois('google.com', {format: ResultFormat.Object});
    console.log(result[WellKnownKeys.Whois]); // or console.log(result);
}

run();
```
