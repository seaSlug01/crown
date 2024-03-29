import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

// Input func that takes the shop state
const selectShop = state => state.shop;

// Output
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = memoize(collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);
