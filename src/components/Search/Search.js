import React, { Component, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './search.scss';

const fitnessGoalOptions = ['Weight Loss', 'Muscle Building', 'No Goal', 'Competitive Lifting'];

export default function Search() {
	const [filtersOpen, setFiltersOpen] = useState(false);

	return (
		<>
			<div className='content'>
				<div className='searchbox-container'>
					<div className='searchbox'>
						<div className='searchbox-primary'>
							<form className='input-group'>
								<input
									type='text'
									className='form-control'
									placeholder="Recipient's username"
									aria-label="Recipient's username"
									aria-describedby='button-addon2'
								/>
								<button
									className='btn btn-outline-secondary search-btn'
									type='button'
									id='button-addon2'>
									Search
								</button>
							</form>

							<button
								className='btn btn-outline-secondary search-btn'
								onClick={() => setFiltersOpen(!filtersOpen)}>
								More Filters
							</button>
						</div>

						<Collapse in={filtersOpen}>
							<div className='flters-bottom mt-3 row m-0'>
								<select
									className='form-select col-4'
									aria-label='Default select example'>
									<option selected value=''>
										Select
									</option>
									{fitnessGoalOptions.map(el => (
										<option value={el}>{el}</option>
									))}
								</select>
								<input
									type='number'
									className='form-control col-4'
									placeholder='Max Distance'
								/>
								<input
									type='number'
									className='form-control col-4'
									placeholder='Some other filter'
								/>
							</div>
						</Collapse>
					</div>
				</div>

				<div className='row m-0'>
					<div className='column'>
						<div className='card'>
							<img src='2.png' />
							<h1>Name</h1>
							<p className='title'>CEO & Founder</p>
							<p>Skill</p>
							<a href='#'>
								<i className='fa fa-instagram'></i>
							</a>
							<a href='#'>
								<i className='fa fa-twitter'></i>
							</a>
							<a href='#'>
								<i className='fa fa-dribbble'></i>
							</a>
							<a href='#'>
								<i className='fa fa-facebook'></i>
							</a>
							<p>
								<button>Add friend</button>
							</p>
						</div>
					</div>

					<div className='column'>
						<div className='card'>
							<img src='2.png' />
							<h1>Name</h1>
							<p className='title'>CEO & Founder</p>
							<p>Skill</p>
							<a href='#'>
								<i className='fa fa-instagram'></i>
							</a>
							<a href='#'>
								<i className='fa fa-twitter'></i>
							</a>
							<a href='#'>
								<i className='fa fa-dribbble'></i>
							</a>
							<a href='#'>
								<i className='fa fa-facebook'></i>
							</a>
							<p>
								<button>Add friend</button>
							</p>
						</div>
					</div>

					<div className='column'>
						<div className='card'>
							<img src='2.png' />
							<h1>Name</h1>
							<p className='title'>CEO & Founder</p>
							<p>Skill</p>
							<a href='#'>
								<i className='fa fa-instagram'></i>
							</a>
							<a href='#'>
								<i className='fa fa-twitter'></i>
							</a>
							<a href='#'>
								<i className='fa fa-dribbble'></i>
							</a>
							<a href='#'>
								<i className='fa fa-facebook'></i>
							</a>
							<p>
								<button>Add friend</button>
							</p>
						</div>
					</div>

					<div className='column'>
						<div className='card'>
							<img src='2.png' />
							<h1>Name</h1>
							<p className='title'>CEO & Founder</p>
							<p>Skill</p>
							<a href='#'>
								<i className='fa fa-instagram'></i>
							</a>
							<a href='#'>
								<i className='fa fa-twitter'></i>
							</a>
							<a href='#'>
								<i className='fa fa-dribbble'></i>
							</a>
							<a href='#'>
								<i className='fa fa-facebook'></i>
							</a>
							<p>
								<button>Add friend</button>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='area'>
				<ul className='circles'>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</>
	);
}
