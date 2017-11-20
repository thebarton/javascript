import PropTypes from "prop-types";
import React from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
import { defineMessages, injectIntl, intlShape } from "react-intl";
import AcademyInvite from "../components/AcademyInvite";

const messages = defineMessages( {
	modalAriaLabel: {
		id: "modal.arialabel.invite",
		defaultMessage: "Send academy invite",
	},
} );

/*
 * Makes the `aria-hidden="true"` attribute being applied on the root element
 * instead of the body.
 */
Modal.setAppElement( "#root" );

class BaseAcademyInviteModal extends React.Component {

	constructor( props ) {
		super( props );
	}

	/**
	 * Returns the rendered html.
	 *
	 * @returns {ReactElement} The rendered html.
	 */
	render() {
		return (
			<div>
				<Modal
					isOpen={ this.props.isOpen }
					onRequestClose={ this.props.onClose }
					role="dialog"
					contentLabel={ this.props.intl.formatMessage( messages.modalAriaLabel ) }
					overlayClassName={ `${ this.props.className } my-yoast-modal__overlay` }
					className={ `${ this.props.className } my-yoast-modal__content` }
				>
					<AcademyInvite
						onConnectClick={ this.props.onConnect }
						onCancelClick={ this.props.onClose }
					/>
				</Modal>
			</div>
		);
	}
}

BaseAcademyInviteModal.propTypes = {
	className: PropTypes.string,
	intl: intlShape.isRequired,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onConnect: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errorFound: PropTypes.bool.isRequired,
	error: PropTypes.object,
	query: PropTypes.string.isRequired,
	linkingSiteUrl: PropTypes.string.isRequired,
};

BaseAcademyInviteModal.defaultProps = {
	isOpen: false,
	linkingSiteUrl: "",
};

const fadeModalIn = keyframes`
	from {
		transform: translate(-50%, -80%);
		opacity: 0;
	}

	to {
		transform: translate(-50%, -50%);
		opacity: 1;
	}
`;

const AcademyInviteModal = styled( BaseAcademyInviteModal )`
	&.my-yoast-modal__overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		transition: background 100ms ease-out;
		z-index: 999;
	}

	&.my-yoast-modal__content {
		position: absolute;
		top: 50%;
		left: 50%;
		right: auto;
		bottom: auto;
		width: auto;
		max-width: 90%;
		max-height: 90%;
		border: 0;
		border-radius: 0;
		margin-right: -50%;
		padding: 1em 1.5em 0;
		transform: translate(-50%, -50%);
		background-color: #fff;
		outline: none;

		animation-iteration-count: 1;
		animation-duration: 300ms;
		animation-timing-function: ease;
		animation-delay: 50ms;
		animation-direction: normal;
		animation-fill-mode: both;
		animation-play-state: running;
		animation-name: ${ fadeModalIn };

		@media screen and ( max-width: 500px ) {
			overflow-y: auto;
		}

		@media screen and ( max-height: 640px ) {
			overflow-y: auto;
		}
	}

	.my-yoast-modal__actions {
		padding-top: 1em;
		text-align: right;
	}

	.my-yoast-modal__actions button {
		margin-left: 1em;
	}
`;

export default injectIntl( AcademyInviteModal );
