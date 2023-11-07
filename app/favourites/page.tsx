import React from 'react';
import ImageGridFav from '../components/imagegridfav/imagegridfav';
import Layout from '../components/layout';
import Modal from '../components/modal/modal';

const Favourites: React.FC = () => {
  return (
    <div>
      <Layout>
        <div className="p-2 sm:p-6 md:p-8">
          <ImageGridFav />
          <Modal />
          {/* modal imported just to check weather working on not you can remove at
          any time */}
        </div>
      </Layout>
    </div>
  );
};

export default Favourites;
