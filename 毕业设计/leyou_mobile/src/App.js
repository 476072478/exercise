import Tab from "./components/TabBar";
import { useRoutes, useLocation } from 'react-router-dom'
import NavBar from "./components/Navbar";
import { connect } from 'react-redux'
import './App.css'
import route from './router'
function App(props) {
  const element = useRoutes(route)
  const searchParams = useLocation()
  return (
    <div>
      {searchParams.state === null ? <NavBar>首页</NavBar> : <NavBar>{searchParams.state.name}</NavBar>}
      {element}
      {props.tabbarshow && <Tab />}
      {props.tabbarshow && <div className='Apprepair'></div>}
    </div>
  );
}
const mapStoreState = (store) => {
  return {
    tabbarshow: store.navbarreducer.tabbarshow
  }
}

export default connect(mapStoreState)(App);
