import React from 'react';
import Layout from '../components/layout';
import PromtBar from '../components/promtbar/promtbar';
import ImageGrid from '../components/imagegrid/imagegrid';
import { Account } from '../components/context/accountcontext';
const HomePage = () => {
  return (
    <div className="">
      
      <Layout>
        <div className='ml-2'>
          <PromtBar />
        </div>

        <ImageGrid />
      </Layout>
    </div>
  );
};

export default HomePage;
