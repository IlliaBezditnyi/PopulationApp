import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderProps } from '../types'

const Header: FC<HeaderProps> = ({ title }) => {
  const { textStyle, viewStyle } = styles

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#293241',
    justifyContent: "flex-end",
    paddingLeft: 22,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    height: 90
  },
  textStyle: {
    color: '#fff',
    fontSize: 28
  }
})

export default Header;