import Gtk from "gi://Gtk"
import GLib from "gi://GLib"
import { Astal } from "astal/gtk4"
import { Variable } from "astal"

declare global {
    const START: number
    const CENTER: number
    const END: number
    const FILL: number
    const TOP: number
    const BOTTOM: number
    const LEFT: number
    const RIGHT: number
    const HOME: string
    const THEME: Variable<string>
    const COLORSCHEMES: Array<string>
}

Object.assign(globalThis, {
    START: Gtk.Align.START,
    CENTER: Gtk.Align.CENTER,
    END: Gtk.Align.END,
    FILL: Gtk.Align.FILL,
    TOP: Astal.WindowAnchor.TOP,
    BOTTOM: Astal.WindowAnchor.BOTTOM,
    LEFT: Astal.WindowAnchor.LEFT,
    RIGHT: Astal.WindowAnchor.RIGHT,
    HOME: GLib.getenv("HOME"),
    THEME: Variable<string>(""),
    COLORSCHEMES: ["catppuccin","gruv"]
})