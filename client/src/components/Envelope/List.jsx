import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const List = ({
	setCurrentEnvelope,
	envelopeState: { envelopes, current },
	listRef,
}) => {
	return envelopes.length !== 0 ? (
		<Table
			responsive
			hover
			borderless
			variant='dark'
			className='envelope-list'
		>
			<thead>
				<tr>
					<th scope='col'>#</th>
					<th scope='col'>Purpose</th>
					<th scope='col'>Goal Money</th>
					<th scope='col'>Status</th>
					<th scope='col'>Date</th>
				</tr>
			</thead>
			<tbody ref={listRef}>
				{envelopes.map((element, index) => (
					<tr
						key={index}
						onClick={() => setCurrentEnvelope(element._id)}
						className={`${
							current === element._id
								? 'bg-primary text-white'
								: ''
						}`}
					>
						<th scope='row'>{index + 1}</th>
						<td>{element.purpose}</td>
						<td>{element.goalMoney.toLocaleString()}</td>
						<td>{element.status}</td>
						<td>
							{moment(element.dateCreated).format(
								'MMMM DD, YYYY'
							)}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	) : (
		<p>No envelope</p>
	);
};

List.propTypes = {
	envelopeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps)(List);
