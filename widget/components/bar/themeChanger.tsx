import { bind, execAsync, Variable } from "astal";

export default function ThemesChanger() {
    var currentIndex = bind(THEME).as(value => COLORSCHEMES.indexOf(value))
    const animating = Variable<boolean>(false)
    const changeTheme = () => {
        animating.set(!animating.get())
        THEME.set(COLORSCHEMES[(currentIndex.get() + 1) % COLORSCHEMES.length]);
    }

    return (
        <button cssClasses={animating().as((animating) => ["theme", animating ? "active" : "deactive"])} onClicked={changeTheme}>
            <image iconName={"arrow-symbolic"}></image>
        </button>
    )
}