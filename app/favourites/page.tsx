import React from 'react';
import ImageGridFav from '../components/imagegridfav/imagegridfav';
import Layout from '../components/layout';

const Favourites: React.FC = () => {
  return (
    <div>
      <Layout>
        <div className="p-2 sm:p-6 md:p-8">
          <ImageGridFav />
        </div>
      </Layout>
    </div>
  );
};

export default Favourites;
