import { bind } from "astal";
import Wp from "gi://AstalWp";

export default function VolumeStatus() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;

  return (
    <box
      onScroll={(_, __, dy) =>
        dy < 0 ? (speaker.volume += 0.01) : (speaker.volume += -0.01)
      }
      cssClasses={["volume"]}
      valign={CENTER}
    >
      <slider
        value={bind(speaker, "volume")}
        onValueChanged={(self) => (speaker.volume = self.value)}
      />
      <image iconName={bind(speaker, "volumeIcon")} />
    </box>
  );
}
