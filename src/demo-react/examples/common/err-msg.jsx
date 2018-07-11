
export const errMsg = (label, additionalMessages) => (error) => (
    <p className="help-block">
        {toMsg(label, additionalMessages, error)}
    </p>
);
export const errBox = (label, additionalMessages) => (error) => (
    <div className="box text-danger">
        {toMsg(label, additionalMessages, error)}
    </div>
);

const toMsg = (label, additionalMessages, error) => (
    typeof error === "string" ?
    {...defaultErrMsgs, ...additionalMessages}[error](label, error) :
    {...defaultErrMsgs, ...additionalMessages}[error.name](label, error)
);

const defaultErrMsgs = {
    "@parse": (label) => `${label} has invalid format`,
    "@debounce": (label) => `Typing...`,
    "required": (label) => `${label} is required`,
    "email": (label) => `${label} has invalid email format`,
    "equals": (label, {value}) => `${label} needs to be equals to "${value}"`,
    "col-not-empty": (label) => `At least 1 ${label} is required`,
    "min-length": (label, {length}) => `${label} needs to have more than ${length} characters`,
    "max-length": (label, {length}) => `No more than ${length} ${label} allowed`,
    "equals-path": (label, {path}) => `${label} needs to be the same with ${path}`,
};