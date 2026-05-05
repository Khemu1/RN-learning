import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { colors } from "@/theme";

export default function UserDialog({
  open: controlledOpen,
  onClose,
  title,
  children,
  trigger = null,
  style = {},
  contentStyle = {},
  hideCloseButton = false,
  stayOpened = false,
}) {
  const [open, setOpen] = useState(controlledOpen ?? false);

  useEffect(() => {
    if (controlledOpen !== undefined) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen]);

  const handleClose = () => {
    if (stayOpened) return;
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      {/* Trigger */}
      {trigger && typeof trigger === "function" && trigger(() => setOpen(true))}

      {/* Modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        {/* Overlay */}
        <Pressable style={styles.overlay} onPress={handleClose}>
          {/* Stop propagation so clicking inside doesn't close */}
          <Pressable
            style={[styles.content, contentStyle]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title ? (
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>

                {!hideCloseButton && (
                  <Pressable onPress={handleClose}>
                    <Text style={styles.close}>✕</Text>
                  </Pressable>
                )}
              </View>
            ) : null}

            {/* Body */}
            <View style={styles.body}>{children}</View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#333",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  close: {
    fontSize: 18,
    color: "#aaa",
  },
  body: {
    padding: 16,
  },
});
