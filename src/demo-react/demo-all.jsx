import {RComponent} from "./common/r-component";
import {DemoLayout} from "./layout/demo-layout";
import {DemoIntro} from "./intro/demo-intro";
import {ExamplesAll} from "./examples/examples-all";
import {GettingStarted} from "./intro/getting-started";

export class DemoAll extends RComponent {
    render() {
        return (
            <DemoLayout className="">
                <DemoIntro/>
                <GettingStarted/>

                <ExamplesAll/>
            </DemoLayout>
        );
    }
}