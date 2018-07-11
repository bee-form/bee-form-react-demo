import cln from "classnames";
import {errMsg} from "../common/err-msg";

export default ({fv, onDelete}) => (
    <div className="box question-form">

        {fv.withControl("text", ({bind, isValid, withError}) => (
            <div
                className={cln("form-group", {"has-error": !isValid()})}
            >
                <label className="control-label">Question text</label>
                <input
                    {... bind()}
                    className="form-control"
                    placeholder="Question text..."
                />
                {withError(errMsg("Question text"))}
            </div>
        ))}

        <button
            className="btn btn-default"
            onClick={onDelete}
        >
            Delete this question
        </button>
    </div>
);