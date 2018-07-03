import classnames from "classnames";
const {bindDom, bindCom} = RlfDemo.RLF;
const {Cols} = RlfDemo.Utils;
const {required, minLength, colNotEmpty} = RlfDemo.RLF.validates;

export class ExampleList extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showErrors: false,
        };

        let lf = {
            paths: {
                title: [required, minLength(20)],
                "questions": [colNotEmpty]
            },
            iterates: {
                "questions": {
                    "text": [required, minLength(20)]
                }
            },
        };
        this.form = bindCom(lf, {
            component: this,
            // data: {
            //     title: "awfawf awf awfawf awf awfawf awf awfawf awf ",
            //     questions: [{}]
            // }
        });
    }

    render() {
        const {showErrors} = this.state;
        const form = this.form;

        return bindDom(form)(
            <div className={classnames("form example-list", showErrors && "show-errors")}>

                {/* access_code input */}
                <div
                    lf-fg="title"
                    className="form-group"
                >
                    <label className="control-label">Questionnaire title</label>
                    <input
                        lf-bind
                        className="form-control"
                        placeholder="Questionnaire title..."
                    />
                    <p className="help-block" lf-err-msg="Questionnaire title"/>
                </div>


                <div className="question-list">
                    {Cols.isEmpty(form.getPathData("questions")) && (
                        <div className="box text-danger">
                            Questions list can not be empty, please create your first question be clicking the button below
                        </div>
                    )}

                    { form.toFormList("questions").map((questionForm, i) => bindDom(questionForm)(
                        <div className="box question-form" key={i}>

                            <div
                                lf-fg="text"
                                className="form-group"
                            >
                                <label className="control-label">Question text</label>
                                <input
                                    lf-bind
                                    className="form-control"
                                    placeholder="Question text..."
                                />
                                <p className="help-block" lf-err-msg="Question text"/>
                            </div>

                            <button
                                className="btn btn-default"
                                onClick={() => form.changePathData("questions", (questions) => Cols.remove1(questions, questionForm.getData()))}
                            >
                                Delete this question
                            </button>
                        </div>
                    ))}

                    <button
                        className="btn btn-default"
                        onClick={() => form.changePathData("questions", (questions) => (questions || []).concat([{}]))}
                    >
                        Add a question
                    </button>
                </div>


                {/* Submit button */}
                <div className="btns">
                    <button
                        type="submit" className={classnames("btn btn-primary", {disabled: this.form.isInvalid()})}
                        onClick={() => {
                            if (this.form.isInvalid()) {
                                this.setState({showErrors: true});
                                form.focusInvalidField();
                            } else {
                                console.log("Submitting...", form.getData());
                            }
                        }}
                    >
                        Create questionnaire
                    </button>

                    {this.form.isInvalid() && (
                        <span className="help"> - click this to see errors (and focus)</span>
                    )}
                </div>
            </div>
        );
    }
}