import classnames from "classnames";
const {bindDom, bindCom} = RlfDemo.RLF;
const {Cols} = RlfDemo.Utils;
const {required, maxLength, colNotEmpty} = RlfDemo.RLF.validates;

const validationSchema = {
    paths: {
        clubName: [required],
        "members": [colNotEmpty]
    },
    iterates: {
        "members": {
            paths: {
                "firstName": [required],
                "lastName": [required],
                "hobbies": [maxLength(5)],
            },
            iterates: {
                "hobbies": {
                    "@": [required],
                }
            },

        },
    },
};

export class ExampleList2 extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showErrors: false,
        };

        this.form = bindCom(validationSchema, {
            component: this,
        });
    }

    render() {
        const {showErrors} = this.state;
        const form = this.form;

        const renderField = (path, label, key) => (
            <div
                lf-fg={path}
                className="form-group"
                key={key}
            >
                <label className="control-label">{label}</label>
                <input
                    lf-bind
                    className="form-control"
                    placeholder={label}
                />
                <p className="help-block" lf-err-msg={label}/>
            </div>
        );

        const renderHobby = (hobbyForm, j) => bindDom(hobbyForm)(
            renderField("@", `Hobby #${j+1}`, `hobby-${j}`)
        );

        const renderMember = (memberForm, i) => bindDom(memberForm)(
            <div className="box member-form" key={`member-${i}`}>
                <h4>
                    Member #{i + 1}
                </h4>

                {renderField("firstName", "First Name")}
                {renderField("lastName" , "Last Name")}

                {memberForm.toFormList("hobbies").map(renderHobby)}

                {memberForm.getPathDataError("hobbies") && (
                    <div className="box text-danger">
                        No more than five hobbies allowed
                    </div>
                )}

                <div className="">
                    <button
                        className="btn btn-default"
                        onClick={() => memberForm.changePathData("hobbies", (hobbies) => (hobbies || []).concat([""]))}
                    >
                        Add new hobby
                    </button>
                </div>

                <div className="">

                    <button
                        className="btn btn-default"
                        onClick={() => form.changePathData("members", (members) => Cols.remove1(members, memberForm.getData()))}
                    >
                        Delete this member
                    </button>
                </div>
            </div>
        );

        return bindDom(form)(
            <div className={classnames("form example-list-2", showErrors && "show-errors")}>

                {renderField("clubName" , "Club Name")}

                <div className="member-list">
                    {form.getPathDataError("members") && (
                        <div className="box text-danger">
                            At least one member must be entered
                        </div>
                    )}

                    { form.toFormList("members").map(renderMember)}

                    <button
                        className="btn btn-default"
                        onClick={() => form.changePathData("members", (members) => (members || []).concat([{}]))}
                    >
                        Add new member
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