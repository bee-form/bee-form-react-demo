const {bindDom, bindCom} = RlfDemo.RLF;
const {required, async} = RlfDemo.RLF.validates;

// Mock api for validating code
function validateCode(code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(code == "c1");
        }, 600);
    });
}

export class ExampleAsync extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = bindCom({
            promotion_code: [
                required,
                async("promotion-code", validateCode) // by default, this will debounce 500ms before the check code api is called
            ],
        }, {
            component: this,
        });
    }

    render() {
        return bindDom(this.form)(
            <div className="form">

                {/* access_code input */}
                <div
                    lf-fg="promotion_code"
                    className="form-group has-feedback"
                >
                    <label className="control-label">Promotion Code</label>
                    <input
                        lf-bind
                        type="email"
                        className="form-control"
                        placeholder="Promotion Code"
                    />
                    <span className="form-control-feedback" lf-async-feedback aria-hidden="true"/>
                    <p className="help-block" lf-err-msg="Promotion Code"/>
                </div>

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={this.form.isInvalid()}
                >
                    Claim code
                </button>
            </div>
        );
    }
}