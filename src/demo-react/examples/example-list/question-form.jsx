import cln from "classnames";

export default ({fv, onDelete}) => (
  <div className="box question-form">

    {fv.withControl("text", ({bind, isValid, getError}) => (
      <div
        className={cln("form-group", {"has-error": !isValid()})}
      >
        <label className="control-label">Question text</label>
        <input
          {... bind()}
          className="form-control"
          placeholder="Question text..."
        />
        <p className="help-block">
          {getError()}
        </p>
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