const {bindDom, bindCom} = RlfDemo.RLF;
const {required, email, minLength} = RlfDemo.RLF.validates;

export class ExampleLoginBlur extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = bindCom({
            email: [required, email],
            password: [required, minLength(6)],
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

                {/* Email input */}
                <div
                    lf-fg="email"
                    className="form-group"
                >
                    <label className="control-label">Email address</label>
                    <input
                        lf-bind
                        lf-submit-on="blur"
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

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={this.form.isInvalid()}
                >
                    Login
                </button>
            </div>
        );
    }
}