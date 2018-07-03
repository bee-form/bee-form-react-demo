export class RComponent extends React.Component {
    onUnmounts = [];
    onMounts = [];

    componentDidMount() {
        this.mounted = true;
        this.onMounts.forEach((onMount)=> onMount());
    }

    componentWillUnmount() {
        this.mounted = false;
        this.onUnmounts.forEach((onUnmount)=> onUnmount());
    }

    safeUpdate() {
        if (this.mounted) {
            this.forceUpdate();
        }
    }

    onMount(f) {
        this.onMounts.push(f);
    }
    onUnmount(f) {
        this.onUnmounts.push(f);
    }

}