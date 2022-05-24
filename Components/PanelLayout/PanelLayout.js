import React from 'react'
import Footer from '../Website/Footer/Footer'
import Header from '../Website/Header/Header'

const PanelLayout = ({children}) => {
  return (
	<div>
		<Header/>
			<div className="content">
				{children}
			</div>
		<Footer/>
	</div>
  )
}

export default PanelLayout
