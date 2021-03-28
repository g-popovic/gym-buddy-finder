import React, { Component, useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import axios from '../../utils/axiosSetup';
import './search.scss';
import UserMiniProfile from './UserMiniProfile';

const fitnessGoalOptions = ['Weight Loss', 'Muscle Building', 'No Goal', 'Competitive Lifting'];

export default function Search() {
	const [filtersOpen, setFiltersOpen] = useState(false);
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [maxDistance, setMaxDistance] = useState(10000);
	const [fitnessGoal, setFitnessGoal] = useState();

	useEffect(loadUsers, []);

	async function loadUsers() {
		try {
			const { data } = await axios.get('/search-users', { page });
			setUsers(data);
		} catch (err) {
			alert((err.response && err.response.data) || 'Error!');
		}
	}

	return (
		<>
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
								className='btn btn-outline-dark search-btn'
								type='button'
								id='button-addon2'>
								Search
							</button>
						</form>

						<button
							className='btn btn-outline-dark search-btn'
							onClick={() => setFiltersOpen(!filtersOpen)}>
							More Filters
						</button>
					</div>

					<Collapse in={filtersOpen}>
						<div className='flters-bottom mt-3 row m-0'>
							<select
								value={fitnessGoal}
								onChange={e => setFitnessGoal(e.target.value)}
								className='form-select col-3'
								aria-label='Default select example'>
								<option defaultValue value=''>
									Select
								</option>
								{fitnessGoalOptions.map(el => (
									<option value={el}>{el}</option>
								))}
							</select>
							<input
								value={maxDistance}
								onChange={e => setMaxDistance(e.target.value)}
								type='number'
								className='form-control col-3'
								placeholder='Max Distance'
							/>
						</div>
					</Collapse>
				</div>
			</div>
			<div className='row m-0'>
				{users.map(el => (
					<UserMiniProfile key={el._id} user={el} />
				))}
			</div>
		</>
	);
}
