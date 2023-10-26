import React from 'react'
import Layout from '../components/layout'
import PromtBar from '../components/promtbar/promtbar'
import ImageGrid from '../components/imagegrid/imagegrid'

const HomePage = () => {
  return (
    <div className="main-container">
      <Layout >
    <PromtBar/>
    <ImageGrid/>
      </Layout>
    </div>
  )
}

export default HomePage
