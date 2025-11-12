import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { categoryPillStyle as styles } from "../../styles/categoryPillStyle";

type Props = {
  opt: any;
  active: boolean;
  onPress: () => void;
};

export default function CategoryPill({ opt, active, onPress }: Props) {
  return (
    <TouchableOpacity
      key={opt.id}
      onPress={onPress}
      style={[styles.pill, active && styles.pillActive]}
      activeOpacity={0.85}
    >
      <Text style={[styles.pillText, active && styles.pillTextActive]}>
        {opt.label || opt.name || opt.id}
        {opt.count ? ` • ${opt.count}` : ""}
      </Text>

    </TouchableOpacity>
  );
}
