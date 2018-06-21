// External dependencies.
import React from "react";
import PropTypes from "prop-types";

// Internal dependencies.
import SettingsSnippetEditorFields from "./SettingsSnippetEditorFields";
import { replacementVariablesShape } from "../constants";
import ErrorBoundary from "../../../basic/ErrorBoundary";

class SettingsSnippetEditor extends React.Component {
	/**
	 * Constructs the snippet editor.
	 *
	 * @param {Object} props                             The props for the snippet
	 *                                                   editor.
	 * @param {Object} props.replacementVariables        The replacement variables
	 *                                                   for this editor.
	 * @param {Object} props.data                        The initial editor data.
	 * @param {string} props.keyword                     The focus keyword.
	 * @param {string} props.data.title                  The initial title.
	 * @param {string} props.data.slug                   The initial slug.
	 * @param {string} props.data.description            The initial description.
	 * @param {string} props.baseUrl                     The base URL to use for the
	 *                                                   preview.
	 * @param {string} props.mode                        The mode the editor should
	 *                                                   be in.
	 * @param {Function} props.onChange                  Called when the data
	 *                                                   changes.
	 * @param {Object} props.titleLengthProgress       The values for the title
	 *                                                   length assessment.
	 * @param {Object} props.descriptionLengthProgress The values for the
	 *                                                   description length
	 *                                                   assessment.
	 * @param {Function} props.mapDataToPreview          Function to map the editor
	 *                                                   data to data for the preview.
	 * @param {string} props.locale                      The locale of the page.
	 * @param {bool}   props.hasPaperStyle               Whether or not it has paper style.
	 *
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );

		this.state = {
			activeField: null,
			hoveredField: null,
		};

		this.setFieldFocus = this.setFieldFocus.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.onClick = this.onClick.bind( this );
	}

	/**
	 * Handles the onChange event.
	 *
	 * First updates the description progress and title progress.
	 * Then calls the onChange function that is passed through the props.
	 *
	 * @param {string} type The type of change.
	 * @param {string} content The content of the changed field.
	 *
	 * @returns {void}
	 */
	handleChange( type, content ) {
		this.props.onChange( type, content );
	}

	/**
	 * Focuses the preview on the given field.
	 *
	 * @param {String} field The name of the field to focus.
	 *
	 * @returns {void}
	 */
	setFieldFocus( field ) {
		this.setState( {
			activeField: field,
		} );
	}

	/**
	 * Handles click event on a certain field in the snippet preview.
	 *
	 * @param {string} field The field that was clicked on.
	 *
	 * @returns {void}
	 */
	onClick( field ) {
		this.setFieldFocus( field );
	}

	/**
	 * Renders the snippet editor.
	 *
	 * @returns {ReactElement} The snippet editor element.
	 */
	render() {
		const {
			data,
			replacementVariables,
			descriptionEditorFieldPlaceholder,
			hasPaperStyle,
		} = this.props;

		const { activeField, hoveredField } = this.state;

		return (
			<ErrorBoundary>
				<SettingsSnippetEditorFields
					descriptionEditorFieldPlaceholder={ descriptionEditorFieldPlaceholder }
					data={ data }
					activeField={ activeField }
					hoveredField={ hoveredField }
					onChange={ this.handleChange }
					onFocus={ this.setFieldFocus }
					replacementVariables={ replacementVariables }
					containerPadding={ hasPaperStyle ? "0 20px" : "0" }
				/>
			</ErrorBoundary>
		);
	}
}

SettingsSnippetEditor.propTypes = {
	replacementVariables: replacementVariablesShape,
	data: PropTypes.shape( {
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	} ).isRequired,
	onChange: PropTypes.func.isRequired,
	descriptionEditorFieldPlaceholder: PropTypes.string,
	hasPaperStyle: PropTypes.bool,
};

SettingsSnippetEditor.defaultProps = {
	replacementVariables: [],
	hasPaperStyle: true,
};

export default SettingsSnippetEditor;
