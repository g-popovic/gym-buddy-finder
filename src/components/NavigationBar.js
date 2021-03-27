import React, { useContext } from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { UserContext } from '../provider/UserContext';

const Styles = styled.div`
	.navbar {
		background-color: #222;
	}
	a,
	.navbar-nav,
	.navbar-light .nav-link {
		color: white;
		&:hover {
			color: #f0f0f0;
		}
		font-size: 20px;
		margin-left: 25px;
	}
	.navbar-brand {
		font-size: 1.8em;
		color: white;
		&:hover {
			color: #f0f0f0;
		}
	}
	.form-center {
		position: absolute !important;
		left: 25%;
		right: 25%;
	}
`;

export function NavigationBar() {
	const [userContext] = useContext(UserContext);

	return (
		<Styles>
			<Navbar expand='lg'>
				<Navbar.Brand href='/'>GymBuddy</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						{!!userContext.id ? (
							<>
								<Nav.Item>
									<Nav.Link href='/'>Search</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='/chat'>Chat</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='/profile'>My Profile</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='/login'>Log Out</Nav.Link>
								</Nav.Item>{' '}
							</>
						) : (
							<>
								<Nav.Item>
									<Nav.Link href='/'>Search</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='/login'>Login</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href='/register'>Register</Nav.Link>
								</Nav.Item>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Styles>
	);
}
