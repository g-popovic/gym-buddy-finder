import React, { Component } from 'react';
import './profile.scss';

export class Profile extends Component {
	render() {
		return (
			<>
				<div className='profile-main'>
					<div className='profile-header'>
						<div className='user-detail'>
							<div className='user-image'></div>
							<div className='user-data'>
								<h2>User Name</h2>
								<span className='post-label'>Skill1</span>
								<span className='post-label'>Skill2</span>
								<span className='post-label'>Skill3</span>
								<p>Brif intro of user</p>
							</div>
						</div>
						<div className='tab-panel-main'>
							<ul className='tabs'>
								<li className='tab-link'>Quality1</li>
								<li className='tab-link'>Quality1</li>
								<li className='tab-link'>Quality1</li>
							</ul>
							<div id='Basic-detail' className='tab-content current'>
								<div className='skill-box'>
									<ul>
										<li>
											<strong>My Core Skills:</strong>
										</li>
										<li>
											Main skill1
											<i className='fa fa-star' aria-hidden='true'></i>
											<i className='fa fa-star' aria-hidden='true'></i>
											<i className='fa fa-star' aria-hidden='true'></i>
										</li>
										<li>
											Main skill2
											<i className='fa fa-star' aria-hidden='true'></i>
											<i className='fa fa-star' aria-hidden='true'></i>
										</li>
										<li>
											Main skill3
											<i className='fa fa-star' aria-hidden='true'></i>
										</li>
									</ul>
								</div>
								<div className='bio-box'>
									<div className='heading'>
										<p>
											Professional Bio
											<label>2 Months at gym</label>
										</p>
									</div>
									<div className='desc'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit,
										sed do eiusmod tempor incididunt ut labore et dolore magna
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea commodo.
									</div>
								</div>
								<div className='detail-box'>
									<p>Detail</p>
									<ul className='ul-first'>
										<li>Birth date</li>
										<li>City</li>
										<li>Country</li>
										<li>Contact No</li>
									</ul>
									<ul className='ul-second'>
										<li>8 March 1997</li>
										<li>Jamanagar</li>
										<li>California</li>
										<li>9900990087</li>
									</ul>
								</div>
							</div>
							<div id='Edu-detail' className='tab-content'>
								<div className='Edu-box-main'>
									<h2>
										<i className='fa fa-graduation-cap' aria-hidden='true'></i>{' '}
										Education
									</h2>
									<div className='Edu-box'>
										<h5>
											<span>Graphic designer</span>
											2005 - 2007 | Infoway Corporation
										</h5>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing
											elit.
										</p>
									</div>
									<div className='Edu-box'>
										<h5>
											<span>Web designer</span>
											2007 - 2009 | Light Corporation
										</h5>
										<p>
											Lorem ipsum dolor sit amet, consectetur adipisicing
											elit.
										</p>
									</div>
								</div>
							</div>
							<div id='Portfolio' className='tab-content'>
								<div className='portfolio-box'>
									<div className='portfolio-img-box'>
										<h3>Web Design</h3>
									</div>
									<div className='portfolio-img-box'>
										<h3>Web development</h3>
									</div>
									<div className='portfolio-img-box'>
										<h3>SEO</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Profile;
