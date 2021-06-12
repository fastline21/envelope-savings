import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

const Table = ({ envelope }) => {
	const LoadNumber = () => {
		const render = [];
		let rollNumber = 1;

		const isRollNumber = (rollNumber) =>
			envelope.envelopes.some((element) => element.money === rollNumber);

		const getDate = (rollNumber) => {
			const dateRoll = envelope.envelopes.find(
				(element) => element.money === rollNumber
			);
			return dateRoll.date;
		};
		for (rollNumber; envelope.amount >= rollNumber; rollNumber++) {
			render.push(
				<Col xs={2} sm={2} md={1} lg={1} xl={1} key={rollNumber}>
					{isRollNumber(rollNumber) ? (
						<OverlayTrigger
							key='top'
							placement='top'
							overlay={
								<Tooltip>
									{moment(getDate(rollNumber)).format(
										'MMMM DD, YYYY'
									)}
								</Tooltip>
							}
						>
							<p className='roll-number text-center text-white bg-success'>
								{rollNumber}
							</p>
						</OverlayTrigger>
					) : (
						<p className='roll-number text-center'>{rollNumber}</p>
					)}
				</Col>
			);
		}

		return render;
	};

	return <Row>{envelope && <LoadNumber />}</Row>;
};

export default Table;
