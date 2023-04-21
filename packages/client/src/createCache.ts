import createCache from '@emotion/cache';

export default function createCacheKey() {
  return createCache({ key: 'css-key' });
}
