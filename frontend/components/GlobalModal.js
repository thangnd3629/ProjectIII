import React, { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { HIDE_MODAL } from "../action/types"
import MyModal from "./Modal"
export default function GlobalModal({ duration, ...props }) {
  const { isShown, status, content } = useSelector(
    (state) => state.globalModalReducer
  )
  const dispatch = useDispatch()
  useEffect(() => {
    const autoDestroyModal = setTimeout(() => {
      dispatch({
        type: HIDE_MODAL,
      })
    }, duration)
    return () => {
      clearTimeout(autoDestroyModal)
    }
  }, [isShown])
  const modalOncloseHandler = () => {
    dispatch({
      type: HIDE_MODAL,
    })
  }
  return (
    <MyModal visible={isShown} onClose={modalOncloseHandler}>
      <Text>{content}</Text>
    </MyModal>
  )
}

const styles = StyleSheet.create({})
