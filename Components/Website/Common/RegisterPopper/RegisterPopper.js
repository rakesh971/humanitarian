import React, {useEffect} from 'react'
import Link from 'next/link'
import InjectHTML from '../../InjectHTML/InjectHTML'


const RegisterPopper = ({SetRegisterShow, id, slug, Data}) => {
  return (
	<div className="register_popper">
		<div className="register_popper_wrapper">
			<div className="popper_header">
				<p className="popper_header_title">Register</p>
				<button 
					className="btn close_btn"
					onClick={() => SetRegisterShow(false)}
				>
					<img src="/assets/icons/close_icon.svg" alt="close" />
				</button>
			</div>
			<div className="popper_body">
				<div className="popper_register_wrap">
					<ul>
						<li>
							<p className="side_title">Location</p>
							<p className="side_text">
								<InjectHTML html={Data.details.location} />
							</p>
						</li>
						<li>
							<p className="side_title">Date</p>
							<p className="side_text">{Data.details.date}</p>
						</li>
						<li>
							<p className="side_title">Time</p>
							<p className="side_text">{Data.details.time}</p>
						</li>
						<li>
							<p className="side_title">Type</p>
							<p className="side_text_badge">{Data.details.type}</p>
						</li>
					</ul>
				</div>
				<Link href={`/events/${id}/${slug}/register`}>
					<a className="btn lg">Next</a></Link>
			</div>
		</div>
    </div>
  )
}

export default RegisterPopper