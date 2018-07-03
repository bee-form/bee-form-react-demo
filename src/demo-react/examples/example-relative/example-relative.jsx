const {bindDom, bindCom} = RlfDemo.RLF;
const {required, email, minLength, simple} = RlfDemo.RLF.validates;

export class ExampleRelative extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = bindCom({
            email: [required, email],
            password: [required, minLength(6)],
            confirm: [required, simple("confirm-password", (confirm, getRelativeData) => confirm == getRelativeData("password"))],
        }, {
            component: this,
            data: {
                email: "quanla2003@gmail.com"
            },
        });
    }

    render() {
        return bindDom(this.form)(
            <div className="form">

                <h3>Register</h3>

                {/* Email input */}
                <div
                    lf-fg="email"
                    className="form-group"
                >
                    <label className="control-label">Email address</label>
                    <input
                        lf-bind
                        type="email"
                        className="form-control"
                        placeholder="Email"
                    />
                    <p className="help-block" lf-err-msg="Email"/>
                </div>

                {/* Password input */}
                <div
                    lf-fg="password"
                    className="form-group"
                >
                    <label className="control-label">Password</label>
                    <input
                        lf-bind
                        type="password"
                        className="form-control"
                        placeholder="Password"
                    />
                    <p className="help-block" lf-err-msg="Password"/>
                </div>

                {/* Confirm password input */}
                <div
                    lf-fg="confirm"
                    className="form-group"
                >
                    <label className="control-label">Confirm password</label>
                    <input
                        lf-bind
                        type="password"
                        className="form-control"
                        placeholder="Password"
                    />
                    <p className="help-block" lf-err-msg="Confirm password"/>
                </div>

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={this.form.isInvalid()}
                >
                    Register
                </button>
            </div>
        );
    }
}