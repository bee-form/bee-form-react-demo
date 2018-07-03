import {RComponent} from "../../common/r-component";
import classnames from "classnames";

export class Tabs extends RComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: 0,
        };
    }

    render() {
        const {tabs} = this.props;
        const {selected} = this.state;

        return (
            <div className="tabs">

                <ul className="nav nav-tabs">
                    {tabs.map((tab, i) => (
                        <li
                            className={classnames("nav-item", {active: selected == i})}
                            key={i}
                            onClick={() => i != selected && this.setState({selected: i})}
                        >
                            <a className="nav-link">{tab.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="tab-content">
                    {tabs[selected].content()}
                </div>

            </div>
        );
    }
}