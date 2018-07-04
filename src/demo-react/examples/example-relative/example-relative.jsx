const {createForm, basicValidators: {required, email, minLength, equalsPath}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleRelative extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            email: [required, email],
            password: [required, minLength(6)],
            confirm: [required, equalsPath("password")],
        }, {
            email: "quanla2003@gmail.com"
        });
    }

    render() {
        const fv = this.form.createView();

        let r = (label, type, placeholder) => ({bind, isValid, getError}) => (
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
                {fv.withControl("email", r("Email address", "email", "Email"))}

                {/* Password input */}
                {fv.withControl("password", r("Password", "password", "Password"))}

                {/* Confirm password input */}
                {fv.withControl("confirm", r("Confirm password", "password", "Confirm password"))}

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={!fv.isValid()}
                >
                    Register
                </button>
            </div>
        );
    }
}