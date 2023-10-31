import Navbar from './navbar/navbar'
import Footer from './footer/footer'

type Props = {
    children?: React.ReactNode
  }
  const Layout: React.FC<Props> = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
        {children}
        </div>
      
        <Footer/>
      </div>
    )
  }
  
  export default Layout