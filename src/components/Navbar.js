import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = ({items}) => {
	const ret_val = [];
	for(let s in items) {
		ret_val.push(
			<nav>
			&nbsp;&nbsp;
				<NavLink  to={`/${items[s]}`} activeStyle={{ background: 'yellow',color:'black' }}>{items[s]}</NavLink>
			  </nav>
		);
	}


  return (
    //<nav className="nav-wrapper red darken-3" style={{with: '50%'}}>
    
		<div className="rightNavigationBar">
			<div className="container">
        	<nav>
            	<a className="brand-logo">&nbsp;&nbsp;Poke' Times</a>
        	</nav>
        
				{ret_val}
		  
      </div>
	  </div>
    
  )
}

/*
        <ul className="right">
          <li><NavLink exact to='/' activeStyle={{ background: 'yellow',color:'black' }}>Home</NavLink></li>
          <li><NavLink to='/about' activeStyle={{ background: 'yellow',color:'black' }}>About</NavLink></li>
          <li><NavLink to='/contact' activeStyle={{ background: 'yellow',color:'black' }}>Contact</NavLink></li>
          <li><NavLink to='/donate' activeStyle={{ background: 'yellow',color:'black' }}>Donate</NavLink></li>
        </ul>
*/

 export default Navbar;