const {connectForm, basicValidators: {required, email, minLength, equalsPath}} = require("bee-form-react");
const cln = require("classnames");

const formConfig = {
    email: [required, email],
    password: [required, minLength(6)],
    confirm: [required, equalsPath("password")],
};
const initData = {
    email: "quanla2003@gmail.com"
};

const ExampleRelative = ({fv}) => {

    let renderField = (label, type, placeholder) => ({bind, isValid, getError}) => (
        <div
            className={cln("form-group", {"has-error": !isValid()})}
        >
            <label className="control-label">{label}</label>
            <input
                {... bind()}
                type={type}
                className="form-control"
                placeholder={placeholder}
            />
            <p className="help-block">
                {getError()}
            </p>
        </div>
    );

    return (
        <div className="form">

            <h3>Register</h3>

            {/* Email input */}
            {fv.withControl("email", renderField("Email address", "email", "Email"))}

            {/* Password input */}
            {fv.withControl("password", renderField("Password", "password", "Password"))}

            {/* Confirm password input */}
            {fv.withControl("confirm", renderField("Confirm password", "password", "Confirm password"))}

            {/* Submit button */}
            <button
                type="submit" className="btn btn-primary"
                disabled={!fv.isValid()}
            >
                Register
            </button>
        </div>
    );
};

export default connectForm(ExampleRelative, formConfig, initData);