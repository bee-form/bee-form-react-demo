import {errMsg} from "../common/err-msg";

const {connectForm, basicValidators: {required, equals}} = require("bee-form-react");
const cln = require("classnames");

const formConfig = {
    promotion_code: {
        validators: [ required, equals("c1")],
        debounce: 1000,
    },
};

class ExampleDebounce extends React.Component {

    render() {

        const {fv} = this.props;

        return (
            <div className="form">

                {/* access_code input */}
                {fv.withControl("promotion_code", ({isValid, bind, withError}) => (
                    <div
                        className={cln("form-group", {"has-error": !isValid()})}
                    >
                        <label className="control-label">Promotion Code</label>
                        <input
                            {...bind()}
                            type="email"
                            className="form-control"
                            placeholder="Promotion Code"
                        />
                        {withError(errMsg("Promotion Code"))}
                    </div>
                ))}

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={!fv.isValid()}
                >
                    Claim code
                </button>
            </div>
        );
    }
}

export default connectForm(ExampleDebounce, formConfig);