const {createForm, basicValidators: {required, maxLength, colNotEmpty}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleList2 extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showErrors: false,
        };

        this.form = createForm({
            "clubName": [required],
            "members": [colNotEmpty],
            "members[*].firstName" : [required],
            "members[*].lastName" : [required],
            "members[*].hobbies" : [colNotEmpty, maxLength(5)],
            "members[*].hobbies[*]" : [required],
        });

        this.form.onChange(() => this.forceUpdate());
    }

    render() {
        const {showErrors} = this.state;
        const fv = this.form.createView();


        let r = (label) => ({bind, isValid, getError}, key) => (
            <div
                className={cln("form-group", {"has-error": !isValid()})}
                key={key}
            >
                <label className="control-label">{label}</label>
                <input
                    {...bind()}
                    className="form-control"
                    placeholder={label}
                />
                <p className="help-block">
                    {getError()}
                </p>
            </div>
        );

        const renderHobby = (hfv, j) => (
            r(`Hobby #${j+1}`)(hfv, `hobby-${j}`)
        );

        const renderMember = (mfv, i) => (
            <div className="box member-form" key={`member-${i}`}>
                <h4>
                    Member #{i + 1}
                </h4>

                {mfv.withControl("firstName", r("First Name"))}
                {mfv.withControl("lastName", r("Last Name"))}

                {mfv.map("hobbies", renderHobby)}

                {mfv.getError("hobbies") === "col-not-empty" && (
                    <div className="box text-danger">
                        At least 1 hobbies is required
                    </div>
                )}

                {mfv.getError("hobbies") === "max-length" && (
                    <div className="box text-danger">
                        No more than five hobbies allowed
                    </div>
                )}

                <div className="">
                    <button
                        className="btn btn-default"
                        onClick={() => mfv.scope("hobbies").changeValue((hobbies) => (hobbies || []).concat([""]))}
                    >
                        Add new hobby
                    </button>
                </div>

                <div className="">

                    <button
                        className="btn btn-default"
                        onClick={() => fv.scope("members").changeValue((members) => members.filter((m) => m !== mfv.getData()) )}
                    >
                        Delete this member
                    </button>
                </div>
            </div>
        );

        return (
            <div className={cln("form example-list-2", showErrors && "show-errors")}>

                {fv.withControl("clubName", r("Club Name"))}

                <div className="member-list">
                    {fv.getError("members") && (
                        <div className="box text-danger">
                            At least one member must be entered
                        </div>
                    )}

                    { fv.map("members", renderMember)}

                    <button
                        className="btn btn-default"
                        onClick={() => fv.scope("members").changeValue((members) => (members || []).concat([{}]))}
                    >
                        Add new member
                    </button>
                </div>


                {/* Submit button */}
                <div className="btns">
                    <button
                        type="submit" className={cln("btn btn-primary", {disabled: !fv.isValid()})}
                        onClick={() => {
                            if (!fv.isValid()) {
                                this.setState({showErrors: true});
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