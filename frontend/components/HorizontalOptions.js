import React from "react"
import { Text, StyleSheet, View, SectionList, FlatList } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const HorizontalOptions = ({ sections }) => {
  /*
    <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={sections}
            renderSectionHeader={({ section }) => {
                 (
                    <FlatList
                        data={section.data}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.container}>
                                    <Text style={styles.mainText}>{item.content}</Text>
                                </View>
                            )
                        }}
                    />
                )
            }}
        />
    */
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.scrollContent}
        horizontal
        data={sections.data}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <LinearGradient
              colors={item.colors}
              style={styles.card}
              start={{ x: 1.0, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >
              <Text style={styles.mainText}>{item.content}</Text>
            </LinearGradient>
          )
        }}
      />
    </View>
  )
}

export default HorizontalOptions

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  card: {
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: "80%",
    margin: 2,
  },
  mainText: {
    color: "white",
    fontSize: 10,
  },
})
