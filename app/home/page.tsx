import React from 'react'
import Layout from '../components/layout'
import SearchBar from '../components/searchbar/searchbar'
import ImageGrid from '../components/imagegrid/imagegrid'

const HomePage = () => {
  return (
    <div className="main-container">
      <Layout >
    <SearchBar/>
    <ImageGrid/>
      </Layout>
    </div>
  )
}

export default HomePage
