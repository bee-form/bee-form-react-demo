import {errBox, errMsg} from "../common/err-msg";

const {connectForm, basicValidators: {required, maxLength, colNotEmpty}} = require("bee-form-react");
const cln = require("classnames");

const formConfig = {
    "clubName": [required],
    "members": [colNotEmpty],
    "members[*].firstName" : [required],
    "members[*].lastName" : [required],
    "members[*].hobbies" : [colNotEmpty, maxLength(5)],
    "members[*].hobbies[*]" : [required],
};

class ExampleList2 extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            showErrors: false,
        };
    }

    render() {
        const {showErrors} = this.state;
        const {fv} = this.props;

        let renderField = (label) => ({bind, isValid, withError}, key) => (
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

                {withError(errMsg(label))}
            </div>
        );

        const renderMember = (mfv, i) => {

            const renderHobby = (hfv, j) => (
                renderField(`Hobby #${j+1}`)(hfv, `hobby-${j}`)
            );
            return (
                <div className="box member-form" key={`member-${i}`}>
                    <h4>
                        Member #{i + 1}
                    </h4>

                    {mfv.withControl("firstName", renderField("First Name"))}
                    {mfv.withControl("lastName", renderField("Last Name"))}

                    {mfv.map("hobbies", renderHobby)}

                    {mfv.withError("hobbies", errBox("hobbies"))}

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
                            onClick={() => fv.scope("members").changeValue((members) => members.filter((m) => m !== mfv.getData()))}
                        >
                            Delete this member
                        </button>
                    </div>
                </div>
            );
        };

        return (
            <div className={cln("form example-list-2", showErrors && "show-errors")}>

                {fv.withControl("clubName", renderField("Club Name"))}

                <div className="member-list">
                    {fv.withError("members", errBox("members"))}

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
export default connectForm(ExampleList2, formConfig);