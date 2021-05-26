import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

const List = ({ envelopeState: { envelopes } }) => {
	return envelopes ? (
		<Table responsive hover className='envelope-list'>
			<thead>
				<tr>
					<th>#</th>
					<th>Purpose</th>
					<th>Goal Money</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{envelopes.map((e, i) => (
					<tr
						key={i}
						// onClick={() => onClick(e._id)}
						// className={`${
						// 	selected === e._id && 'bg-primary text-white'
						// }`}
					>
						<th>{i + 1}</th>
						<td>{e.purpose}</td>
						<td>{e.goalMoney.toLocaleString()}</td>
						<td>{moment(e.dateCreated).format('MMMM DD YYYY')}</td>
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
