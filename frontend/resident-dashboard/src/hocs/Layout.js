import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { connect } from 'react-redux';

function Layout(props) {
  useEffect(() => {
  }, [])
  return(
  <div>
    <Navbar />
    {props.children}
    <Footer />
  </div>
  );
}

export default connect(null, { })(Layout);