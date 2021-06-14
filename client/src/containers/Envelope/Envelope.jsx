import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import moment from 'moment';

// Actions
import {
	getEnvelope,
	rollNumber,
	currentEnvelope,
	clearCurrent,
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
	DateStarted,
	DateFinished,
	ScheduledFinishDate,
} from 'components/Envelope';
import PreLoader from 'components/PreLoader';

const Envelope = ({
	getEnvelope,
	rollNumber,
	setAlert,
	currentEnvelope,
	clearCurrent,
	envelopeState: { envelope, roll, loading, error },
}) => {
	const { id } = useParams();

	const history = useHistory();

	const isRolled = () => {
		const { latestEnvelope } = envelope;

		if (!latestEnvelope) {
			return false;
		}

		const today = moment().format('YYYY-MM-DD');
		const latestEnvelopeDate = moment(latestEnvelope.date).format(
			'YYYY-MM-DD'
		);
		return moment(today).isSame(latestEnvelopeDate);
	};

	useEffect(() => {
		currentEnvelope(id);
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (envelope && envelope.status === 'Complete') {
			setAlert({
				statusCode: 200,
				message: 'Congrats! You complete your goal.',
			});
		}

		if (error) {
			setAlert({ ...error });
			if (error.statusCode === 404) {
				clearCurrent();
				history.push('/dashboard');
			}
		}

		// eslint-disable-next-line
	}, [envelope, error]);

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
						<h1>
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
						</h1>
					</div>
					<Roll
						isRolled={isRolled()}
						rollNumber={() => rollNumber(id)}
						isCompleted={
							envelope.status === 'Complete' ? true : false
						}
					/>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<TotalMoney totalMoney={envelope.totalMoney || 0} />
				</Col>
				<Col>
					<GoalMoney goalMoney={envelope.goalMoney} />
				</Col>
				<Col>
					<TotalEnvelope totalEnvelope={envelope.envelopes.length} />
				</Col>
				<Col>
					<DateStarted dateStarted={envelope.dateStarted} />
				</Col>
				<Col>
					<DateFinished dateFinished={envelope.dateFinished} />
				</Col>
				<Col>
					<ScheduledFinishDate
						scheduledFinishDate={envelope.scheduledFinishDate}
					/>
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
	clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, {
	getEnvelope,
	rollNumber,
	setAlert,
	currentEnvelope,
	clearCurrent,
})(Envelope);
