import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../heading/Heading';
import CollectionItem from '../collection-item/CollectionItem';

import './preview-collection.scss';

const CollectionPreview = ({ title, items }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div className='collection-preview'>
      <Heading
        title={title}
        subtitle='View More Products'
        url={`shop/${title.toLowerCase()}`}
      />
      <div className='preview'>
        {items
          .filter((item, index) => index < 4)
          .map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
