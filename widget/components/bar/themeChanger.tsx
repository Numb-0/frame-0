import { bind, execAsync, Variable } from "astal";
import { App, Astal, Gtk, Gdk, hook } from "astal/gtk4";

// Take a look in scss/colorschemes
const colorschemes = ["catppuccin","gruv"]
export const themeVar = Variable<string>(colorschemes[0])

export default function ThemesChanger() {

    var currentIndex = bind(themeVar).as(value => colorschemes.indexOf(value))

    const changeTheme = () => {
        themeVar.set(colorschemes[(currentIndex.get() + 1) % colorschemes.length]);
    }

    return (
        <button onClicked={changeTheme}>
            {bind(themeVar)}
        </button>
    )
}