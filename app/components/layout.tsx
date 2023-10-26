import Navbar from './navbar/navbar'
import Footer from './footer/footer'

type Props = {
    children?: React.ReactNode
  }
  const Layout: React.FC<Props> = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col layout-container">
        <Navbar />
        {children}
        <Footer/>
      </div>
    )
  }
  
  export default Layout