const {createForm, basicValidators: {required, email, minLength}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleLogin extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            email: [required, email],
            password: [required, minLength(6)],
        }, {
            email: "quanla2003@gmail.com"
        });

        this.form.onChange(() => this.forceUpdate());
    }

    render() {
        let fv = this.form.createView();

        return (
            <div className="form">

                {/* Email input */}
                {fv.withControl("email", ({bind, getError, hasError}) => (
                    <div
                        className={cln("form-group", {"has-error": hasError()})}
                    >
                        <label className="control-label">Email address</label>
                        <input
                            {... bind()}
                            type="email"
                            className="form-control"
                            placeholder="Email"
                        />
                        <p className="help-block">
                            {getError()}
                        </p>
                    </div>
                ))}

                {/* Password input */}
                {fv.withControl("password", ({bind, getError, hasError}) => (
                    <div
                        className={cln("form-group", {"has-error": hasError()})}
                    >
                        <label className="control-label">Password</label>

                        <input
                            {... bind()}
                            type="password"
                            className="form-control"
                            placeholder="Password"
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
                    Login
                </button>
            </div>
        );
    }
}