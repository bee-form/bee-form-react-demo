import {RComponent} from "../common/r-component";
import classnames from "classnames";

export class DemoLayout extends RComponent {
    render() {
        return (
            <div className="demo-layout">
                <header className="navbar navbar-default navbar-fixed-top navbar-inner">
                    <div className="container">
                        RLF
                    </div>
                </header>

                {this.props.children}
            </div>
        );
    }
}