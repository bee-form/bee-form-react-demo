const {connectForm, basicValidators: {required, minLength, colNotEmpty}} = require("bee-form-react");
const cln = require("classnames");

const formConfig = {
    "title": [required, minLength(20)],
    "questions": [colNotEmpty],
    "questions[*].text": [required, minLength(20)],
};

class ExampleList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showErrors: false,
        };
    }

    render() {
        const {showErrors} = this.state;
        const {fv} = this.props;

        return (
            <div className={cln("form example-list", showErrors && "show-errors")}>

                {/* access_code input */}
                {fv.withControl("title", ({bind, isValid, getError}) => (
                    <div
                        className={cln("form-group", {"has-error": !isValid()})}
                    >
                        <label className="control-label">Questionnaire title</label>
                        <input
                            {...bind()}
                            className="form-control"
                            placeholder="Questionnaire title..."
                        />
                        <p className="help-block">
                            {getError()}
                        </p>
                    </div>
                ))}


                <div className="question-list">
                    {fv.getError("questions") && (
                        <div className="box text-danger">
                            Questions list can not be empty, please create your first question be clicking the button below
                        </div>
                    )}

                    { fv.map("questions", (qfv, i) => (
                        <div className="box question-form" key={i}>

                            {qfv.withControl("text", ({bind, isValid, getError}) => (
                                <div
                                    className={cln("form-group", {"has-error": !isValid()})}
                                >
                                    <label className="control-label">Question text</label>
                                    <input
                                        {... bind()}
                                        className="form-control"
                                        placeholder="Question text..."
                                    />
                                    <p className="help-block">
                                        {getError()}
                                    </p>
                                </div>
                            ))}

                            <button
                                className="btn btn-default"
                                onClick={() => fv.scope("questions").changeValue((questions) => questions.filter((q) => q!==qfv.getData()))}
                            >
                                Delete this question
                            </button>
                        </div>
                    ))}

                    <button
                        className="btn btn-default"
                        onClick={() => fv.scope("questions").changeValue((questions) => (questions || []).concat([{}]))}
                    >
                        Add a question
                    </button>
                </div>


                {/* Submit button */}
                <div className="btns">
                    <button
                        type="submit" className={cln("btn btn-primary", {disabled: !fv.isValid()})}
                        onClick={() => {
                            if (!fv.isValid()) {
                                this.setState({showErrors: true});
                                // form.focusInvalidField();
                            } else {
                                console.log("Submitting...", fv.getData());
                            }
                        }}
                    >
                        Create questionnaire
                    </button>

                </div>
            </div>
        );
    }
}

export default connectForm(ExampleList, formConfig);