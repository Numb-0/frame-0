import Gtk from "gi://Gtk"
import GLib from "gi://GLib"

declare global {
    const START: number
    const CENTER: number
    const END: number
    const FILL: number
    const HOME: string
}

Object.assign(globalThis, {
    START: Gtk.Align.START,
    CENTER: Gtk.Align.CENTER,
    END: Gtk.Align.END,
    FILL: Gtk.Align.FILL,
    HOME: GLib.getenv("HOME"),
})