import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/storeStyles";

type Props = { store: "tesco" | "lidl"; setStore: (s: "tesco" | "lidl") => void };

export default function StoreSwitch({ store, setStore }: Props) {
  return (
    <View style={styles.row}>
      {(["tesco", "lidl"] as const).map((skey) => {
        const active = store === skey;
        return (
          <TouchableOpacity
            key={skey}
            onPress={() => setStore(skey)}
            style={[styles.storeBtn, active && styles.storeBtnActive]}
          >
            <Text style={[styles.storeBtnText, active && styles.storeBtnTextActive]}>
              {skey.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
