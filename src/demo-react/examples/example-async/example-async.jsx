const {connectForm, basicValidators: {required}} = require("bee-form-react");
const cln = require("classnames");

// Mock api for validating code
function validateCode(code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(code === "c1");
        }, 600);
    });
}

const formConfig = {
    promotion_code: [
        required,
        {
            name: "promotion-code",
            validate: validateCode,
        }
    ],
};

const ExampleAsync = ({fv}) => (
    <div className="form">

        {/* access_code input */}
        {fv.withControl("promotion_code", ({isValid, bind, getError}) => (
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
                <p className="help-block">
                    {getError()}
                </p>
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

export default connectForm(ExampleAsync, formConfig);