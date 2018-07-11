import cln from "classnames";

const {connectForm, basicValidators: {required, email, minLength}} = require("bee-form-react");

const formConfig = {
    email: [required, email],
    password: [required, minLength(6)],
};
const initData = {
    email: "quanla2003@gmail.com"
};

const ExampleLogin = ({fv}) => (
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

      {fv.withControl("remember", ({getValue, changeValue}) => (
        <div className="checkbox">
          <label>
            <input type="checkbox" checked={!!getValue()} onClick={() => changeValue((old) => !old)} />
            Remember me
          </label>
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

export default connectForm(ExampleLogin, formConfig, initData);