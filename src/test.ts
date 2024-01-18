import test from 'ava';
import {whois, WellKnownKeys, ResultFormat} from './index';

const GOOGLE_COM = 'google.com';
const GOOGLE_RU = 'google.ru';
const MAJENTO_RU = 'majento.ru';

function isPlainObject(value: unknown) {
  if (typeof value !== 'object' || value === null) return false;

  if (Object.prototype.toString.call(value) !== '[object Object]') return false;

  const proto = Object.getPrototypeOf(value);
  if (proto === null) return true;

  const Ctor =
    Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
    proto.constructor;
  return (
    typeof Ctor === 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.call(Ctor) === Function.prototype.call(value)
  );
}

test(`raw: ${GOOGLE_COM}`, async t => {
  const result = await whois(GOOGLE_COM);

  t.assert(typeof result === 'string');
  for (const key of Object.values(WellKnownKeys)) {
    t.regex(result, new RegExp(key));
  }
});

test(`array: ${GOOGLE_COM}`, async t => {
  const result = await whois(GOOGLE_COM, {format: ResultFormat.Array});

  t.assert(Array.isArray(result));
  t.assert(result.length);
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(result.findIndex(pair => pair.key === key));
  }
});

test(`object: ${GOOGLE_COM}`, async t => {
  const result = await whois(GOOGLE_COM, {format: ResultFormat.Object});

  t.assert(isPlainObject(result));
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(typeof result[key] !== 'undefined');
  }
});

test(`raw: ${GOOGLE_RU}`, async t => {
  const result = await whois(GOOGLE_RU);

  t.assert(typeof result === 'string');
  for (const key of Object.values(WellKnownKeys)) {
    t.regex(result, new RegExp(key));
  }
});

test(`array: ${GOOGLE_RU}`, async t => {
  const result = await whois(GOOGLE_RU, {format: ResultFormat.Array});

  t.assert(Array.isArray(result));
  t.assert(result.length);
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(result.findIndex(pair => pair.key === key));
  }
});

test(`object: ${GOOGLE_RU}`, async t => {
  const result = await whois(GOOGLE_RU, {format: ResultFormat.Object});

  t.assert(isPlainObject(result));
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(typeof result[key] !== 'undefined');
  }
});

test(`raw: ${MAJENTO_RU}`, async t => {
  const result = await whois(MAJENTO_RU);

  t.assert(typeof result === 'string');
  for (const key of Object.values(WellKnownKeys)) {
    t.regex(result, new RegExp(key));
  }
});

test(`array: ${MAJENTO_RU}`, async t => {
  const result = await whois(MAJENTO_RU, {format: ResultFormat.Array});

  t.assert(Array.isArray(result));
  t.assert(result.length);
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(result.findIndex(pair => pair.key === key));
  }
});

test(`object: ${MAJENTO_RU}`, async t => {
  const result = await whois(MAJENTO_RU, {format: ResultFormat.Object});

  t.assert(isPlainObject(result));
  for (const key of Object.values(WellKnownKeys)) {
    t.assert(typeof result[key] !== 'undefined');
  }
});
