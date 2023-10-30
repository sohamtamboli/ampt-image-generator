import React from 'react';
import Layout from '../components/layout';
import ImageGridFav from '../components/imagegridfav/imagegridfav';

const Favourites = () => {
  return (
    <div>
      <Layout>
        <div>
          <ImageGridFav />
        </div>
      </Layout>
    </div>
  );
};

export default Favourites;
