import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

// Actions
import {
	getEnvelope,
	rollNumber,
	currentEnvelope,
} from 'actions/envelopeAction';
import { setAlert } from 'actions/alertAction';

// Components
import {
	Table,
	Roll,
	CurrentNumber,
	TotalMoney,
	GoalMoney,
	TotalEnvelope,
} from 'components/Envelope';
import PreLoader from 'components/PreLoader';

const Envelope = ({
	getEnvelope,
	rollNumber,
	setAlert,
	currentEnvelope,
	envelopeState: { envelope, roll, loading },
}) => {
	const { id } = useParams();

	useEffect(() => {
		currentEnvelope(id);
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (envelope && envelope.envelopes.length === envelope.amount) {
			setAlert({
				statusCode: 200,
				message: 'Congrats! You complete your goal!',
			});
		}
		// eslint-disable-next-line
	}, [envelope]);

	if (!envelope) {
		return <PreLoader />;
	}

	return (
		<Container className='pt-5'>
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<h1 className='pb-5'>{envelope.purpose}</h1>
					<div className='envelope-table'>
						<Table envelope={envelope} />
					</div>
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}>
					<div className='text-center envelope-current-number'>
						{loading ? (
							<Spinner
								animation='grow'
								variant='primary'
								role='status'
								style={{
									width: '2.92rem',
									height: '2.92rem',
								}}
							>
								<span className='sr-only'>Loading...</span>
							</Spinner>
						) : (
							<CurrentNumber
								roll={
									(envelope.latestEnvelope &&
										envelope.latestEnvelope.money) ||
									roll
								}
							/>
						)}
					</div>
					<Roll rollNumber={() => rollNumber(id)} />
				</Col>
			</Row>
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<hr />
					<Row>
						<Col>
							<TotalMoney totalMoney={envelope.totalMoney || 0} />
						</Col>
						<Col>
							<GoalMoney goalMoney={envelope.goalMoney} />
						</Col>
						<Col>
							<TotalEnvelope
								totalEnvelope={envelope.envelopes.length}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

Envelope.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	getEnvelope: PropTypes.func.isRequired,
	rollNumber: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	currentEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, {
	getEnvelope,
	rollNumber,
	setAlert,
	currentEnvelope,
})(Envelope);
