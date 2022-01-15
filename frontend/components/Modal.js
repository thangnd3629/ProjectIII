import React, { useState } from "react"
import {
  Modal,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"

const MyModal = ({ visible, onClose, ...props }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={styles.container} onPressOut={onClose}>
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View>{props.children}</View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
})

export default MyModal
